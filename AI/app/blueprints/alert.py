"""
告警追溯（事后追溯）Blueprint
直连 iot_alert 表，提供告警的分页查询、详情、统计和清除功能
"""
import logging
from datetime import datetime
from flask import Blueprint, request, jsonify
from db_models import db
from sqlalchemy import text

alert_bp = Blueprint('alert', __name__)
logger = logging.getLogger(__name__)

# 字段映射：iot_alert 表 → 前端期望的字段名
COLUMN_MAP = {
    'id': 'id',
    'alert_id': 'alert_id',
    'device_id': 'device_id',
    'device_name': 'device_name',
    'camera_id': 'camera_id',
    'camera_name': 'camera_name',
    'alert_type': 'event',
    'alert_level': 'alert_level',
    'alert_time': 'time',
    'snap_image_url': 'image_url',
    'video_clip_url': 'record_path',
    'video_start_time': 'video_start_time',
    'video_end_time': 'video_end_time',
    'description': 'description',
    'status': 'status',
    'processed_by': 'processed_by',
    'processed_time': 'processed_time',
    'location': 'region',
    'metadata': 'metadata',
}


def _row_to_dict(row):
    """将数据库行转换为前端期望的字段名"""
    # row 是 sqlalchemy Row 对象，可以通过 _mapping 访问
    d = dict(row._mapping)
    result = {}
    for db_col, frontend_col in COLUMN_MAP.items():
        val = d.get(db_col)
        if isinstance(val, datetime):
            val = val.strftime('%Y-%m-%d %H:%M:%S')
        result[frontend_col] = val
    # 添加固定字段
    result['task_name'] = d.get('alert_id', '')
    result['task_type'] = 'realtime'
    result['object'] = _alert_type_to_object(d.get('alert_type', ''))
    result['business_tags'] = []
    # 从 metadata JSONB 中提取业务标签
    meta = d.get('metadata')
    if meta and isinstance(meta, dict):
        tags = meta.get('business_tags', [])
        if isinstance(tags, list):
            result['business_tags'] = tags
    return result


def _alert_type_to_object(alert_type: str) -> str:
    """告警类型映射为前端 COCO 对象名"""
    mapping = {
        'fire': '火',
        'smoke': '烟',
        'intrusion': '人',
        'helmet': '人',
        'plate': '汽车',
        'face': '人',
    }
    return mapping.get(alert_type, '未知')


@alert_bp.route('/page', methods=['GET'])
def alert_page():
    """分页查询告警列表（支持多维筛选）"""
    try:
        page_no = int(request.args.get('pageNo', 1))
        page_size = int(request.args.get('pageSize', 10))
        if page_no < 1 or page_size < 1:
            return jsonify({'code': 400, 'msg': '参数错误：pageNo和pageSize必须为正整数'}), 400

        # 构建 WHERE 条件
        conditions = ['deleted = false']
        params = {}

        # 设备ID筛选
        device_id = request.args.get('device_id', '').strip()
        if device_id:
            conditions.append('device_id = :device_id')
            params['device_id'] = int(device_id) if device_id.isdigit() else device_id

        # 告警事件（alert_type）
        event = request.args.get('event', '').strip()
        if event:
            conditions.append('alert_type = :alert_type')
            params['alert_type'] = event

        # 告警对象（映射回 alert_type）
        obj = request.args.get('object', '').strip()
        if obj:
            # 反向映射 COCO 对象名 → alert_type
            obj_to_type = {
                '人': ['intrusion', 'helmet', 'face'],
                '汽车': ['plate'],
                '火': ['fire'],
                '烟': ['smoke'],
            }
            types = obj_to_type.get(obj, [obj])
            placeholders = ', '.join([f':obj_{i}' for i in range(len(types))])
            conditions.append(f'alert_type IN ({placeholders})')
            for i, t in enumerate(types):
                params[f'obj_{i}'] = t

        # 任务名称（模糊匹配 alert_id）
        task_name = request.args.get('task_name', '').strip()
        if task_name:
            conditions.append('alert_id ILIKE :task_name')
            params['task_name'] = f'%{task_name}%'

        # 时间范围
        begin_time = request.args.get('begin_datetime', '').strip()
        end_time = request.args.get('end_datetime', '').strip()
        if begin_time:
            conditions.append('alert_time >= :begin_time')
            params['begin_time'] = begin_time
        if end_time:
            conditions.append('alert_time <= :end_time')
            params['end_time'] = end_time

        # 业务标签（在 metadata JSONB 中搜索）
        business_tags = request.args.get('business_tags', '').strip()
        if business_tags:
            tags = [t.strip() for t in business_tags.split(',') if t.strip()]
            if tags:
                tag_conds = []
                for i, tag in enumerate(tags):
                    tag_conds.append(f"metadata->>'business_tags' ILIKE :tag_{i}")
                    params[f'tag_{i}'] = f'%{tag}%'
                conditions.append(f"({' OR '.join(tag_conds)})")

        where_clause = ' AND '.join(conditions)

        # 查询总数
        count_sql = f'SELECT COUNT(*) FROM iot_alert WHERE {where_clause}'
        total = db.session.execute(text(count_sql), params).scalar()

        # 分页查询
        offset = (page_no - 1) * page_size
        query_sql = f'''
            SELECT * FROM iot_alert
            WHERE {where_clause}
            ORDER BY alert_time DESC
            LIMIT :limit OFFSET :offset
        '''
        params['limit'] = page_size
        params['offset'] = offset

        rows = db.session.execute(text(query_sql), params).fetchall()
        alert_list = [_row_to_dict(row) for row in rows]

        return jsonify({
            'code': 0,
            'msg': 'success',
            'data': {
                'alert_list': alert_list,
                'total': total,
            }
        })
    except ValueError as e:
        return jsonify({'code': 400, 'msg': f'参数类型错误: {str(e)}'}), 400
    except Exception as e:
        logger.error(f'告警分页查询失败: {str(e)}', exc_info=True)
        return jsonify({'code': 500, 'msg': f'服务器内部错误: {str(e)}'}), 500


@alert_bp.route('/count', methods=['GET'])
def alert_count():
    """获取指定设备的告警数量"""
    try:
        device_id = request.args.get('device_id', '').strip()
        conditions = ['deleted = false']
        params = {}
        if device_id:
            conditions.append('device_id = :device_id')
            params['device_id'] = int(device_id) if device_id.isdigit() else device_id

        where_clause = ' AND '.join(conditions)
        total = db.session.execute(
            text(f'SELECT COUNT(*) FROM iot_alert WHERE {where_clause}'),
            params
        ).scalar()

        return jsonify({'code': 0, 'msg': 'success', 'data': total})
    except Exception as e:
        logger.error(f'告警计数失败: {str(e)}')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@alert_bp.route('/statistics', methods=['GET'])
def alert_statistics():
    """获取仪表板告警统计信息"""
    try:
        stats = {}
        # 总告警数
        stats['total'] = db.session.execute(
            text("SELECT COUNT(*) FROM iot_alert WHERE deleted = false")
        ).scalar()

        # 待处理数
        stats['pending'] = db.session.execute(
            text("SELECT COUNT(*) FROM iot_alert WHERE deleted = false AND status = 'pending'")
        ).scalar()

        # 今日告警数
        stats['today'] = db.session.execute(
            text("SELECT COUNT(*) FROM iot_alert WHERE deleted = false AND alert_time >= CURRENT_DATE")
        ).scalar()

        # 按类型统计
        type_rows = db.session.execute(text(
            "SELECT alert_type, COUNT(*) as cnt FROM iot_alert WHERE deleted = false GROUP BY alert_type"
        )).fetchall()
        stats['by_type'] = {row[0]: row[1] for row in type_rows}

        # 按等级统计
        level_rows = db.session.execute(text(
            "SELECT alert_level, COUNT(*) as cnt FROM iot_alert WHERE deleted = false GROUP BY alert_level"
        )).fetchall()
        stats['by_level'] = {row[0]: row[1] for row in level_rows}

        return jsonify({'code': 0, 'msg': 'success', 'data': stats})
    except Exception as e:
        logger.error(f'告警统计失败: {str(e)}')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@alert_bp.route('/delete/<int:alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    """软删除单条告警"""
    try:
        result = db.session.execute(
            text("UPDATE iot_alert SET deleted = true, update_time = NOW() WHERE id = :id AND deleted = false"),
            {'id': alert_id}
        )
        db.session.commit()
        if result.rowcount == 0:
            return jsonify({'code': 404, 'msg': '告警记录不存在'}), 404
        return jsonify({'code': 0, 'msg': '删除成功'})
    except Exception as e:
        db.session.rollback()
        logger.error(f'删除告警失败: {str(e)}')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@alert_bp.route('/clear', methods=['DELETE'])
def clear_by_task():
    """按任务名称清空告警"""
    try:
        task_name = request.args.get('task_name', '').strip()
        if not task_name:
            return jsonify({'code': 400, 'msg': '缺少 task_name 参数'}), 400

        result = db.session.execute(
            text("UPDATE iot_alert SET deleted = true, update_time = NOW() WHERE alert_id ILIKE :name AND deleted = false"),
            {'name': f'%{task_name}%'}
        )
        db.session.commit()
        return jsonify({'code': 0, 'msg': f'已清空 {result.rowcount} 条告警', 'data': result.rowcount})
    except Exception as e:
        db.session.rollback()
        logger.error(f'清空告警失败: {str(e)}')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@alert_bp.route('/clear/all', methods=['DELETE'])
def clear_all():
    """清空所有告警"""
    try:
        result = db.session.execute(
            text("UPDATE iot_alert SET deleted = true, update_time = NOW() WHERE deleted = false")
        )
        db.session.commit()
        return jsonify({'code': 0, 'msg': f'已清空 {result.rowcount} 条告警', 'data': result.rowcount})
    except Exception as e:
        db.session.rollback()
        logger.error(f'清空全部告警失败: {str(e)}')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@alert_bp.route('/record/query', methods=['GET'])
def query_alert_record():
    """根据告警时间和设备ID查询对应录像"""
    try:
        device_id = request.args.get('device_id', '').strip()
        alert_time = request.args.get('alert_time', '').strip()

        if not device_id or not alert_time:
            return jsonify({'code': 400, 'message': '缺少必要参数：device_id 或 alert_time'}), 400

        # 查找录像片段
        row = db.session.execute(text("""
            SELECT video_clip_url, video_start_time, video_end_time
            FROM iot_alert
            WHERE device_id = :device_id
              AND alert_time <= :alert_time::timestamp
              AND deleted = false
            ORDER BY alert_time DESC
            LIMIT 1
        """), {'device_id': int(device_id) if device_id.isdigit() else device_id, 'alert_time': alert_time}).fetchone()

        if not row or not row[0]:
            return jsonify({'code': 400, 'message': '暂未找到该时间段的录像文件'}), 400

        return jsonify({
            'code': 0,
            'msg': 'success',
            'data': {
                'video_clip_url': row[0],
                'video_start_time': row[1].strftime('%Y-%m-%d %H:%M:%S') if row[1] else None,
                'video_end_time': row[2].strftime('%Y-%m-%d %H:%M:%S') if row[2] else None,
            }
        })
    except Exception as e:
        logger.error(f'查询录像失败: {str(e)}')
        return jsonify({'code': 500, 'message': str(e)}), 500
