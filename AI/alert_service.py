"""
独立告警追溯微服务 - 轻量级 Flask 直连 PostgreSQL iot_alert 表
部署: python3 alert_service.py
"""
import os
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras

logging.basicConfig(level=logging.INFO, format="%(asctime)s [alert] %(levelname)s: %(message)s")
log = logging.getLogger("alert-service")

app = Flask(__name__)
CORS(app)

# 数据库连接配置
DSN = {
    "host": os.environ.get("PG_HOST", "localhost"),
    "port": int(os.environ.get("PG_PORT", 5432)),
    "dbname": os.environ.get("PG_DBNAME", "iot-ai20"),
    "user": os.environ.get("PG_USER", "postgres"),
    "password": os.environ.get("PG_PASSWORD", "iot45722414822"),
}

# 字段映射
COLUMN_MAP = {
    'id': 'id', 'alert_id': 'alert_id', 'device_id': 'device_id', 'device_name': 'device_name',
    'camera_id': 'camera_id', 'camera_name': 'camera_name', 'alert_type': 'event',
    'alert_level': 'alert_level', 'alert_time': 'time', 'snap_image_url': 'image_url',
    'video_clip_url': 'record_path', 'video_start_time': 'video_start_time',
    'video_end_time': 'video_end_time', 'description': 'description', 'status': 'status',
    'processed_by': 'processed_by', 'processed_time': 'processed_time',
    'location': 'region', 'metadata': 'metadata',
}

ALERT_TYPE_TO_OBJECT = {
    'fire': '火', 'smoke': '烟', 'intrusion': '人', 'helmet': '人',
    'plate': '汽车', 'face': '人',
}


def get_conn():
    """获取数据库连接（每次请求新建，用完关闭）"""
    return psycopg2.connect(**DSN)


def row_to_dict(row):
    """将数据库行映射为前端字段名"""
    d = dict(row)
    result = {}
    for db_col, fe_col in COLUMN_MAP.items():
        val = d.get(db_col)
        if isinstance(val, datetime):
            val = val.strftime('%Y-%m-%d %H:%M:%S')
        result[fe_col] = val
    result['task_name'] = d.get('alert_id', '')
    result['task_type'] = 'realtime'
    result['object'] = ALERT_TYPE_TO_OBJECT.get(d.get('alert_type', ''), '未知')
    result['business_tags'] = []
    meta = d.get('metadata')
    if meta and isinstance(meta, dict):
        tags = meta.get('business_tags', [])
        if isinstance(tags, list):
            result['business_tags'] = tags
    return result


def obj_to_types(obj_name):
    """前端 object 名称 → alert_type 列表"""
    mapping = {
        '人': ['intrusion', 'helmet', 'face'],
        '汽车': ['plate'],
        '火': ['fire'],
        '烟': ['smoke'],
    }
    return mapping.get(obj_name, [obj_name])


@app.route('/actuator/health')
@app.route('/health')
def health():
    try:
        conn = get_conn()
        conn.close()
        return jsonify({"code": 0, "msg": "ok", "data": {"service": "alert-service"}})
    except Exception as e:
        return jsonify({"code": 500, "msg": str(e)}), 500


@app.route('/video/alert/page', methods=['GET'])
def alert_page():
    try:
        page_no = int(request.args.get('pageNo', 1))
        page_size = int(request.args.get('pageSize', 10))
        if page_no < 1 or page_size < 1:
            return jsonify({'code': 400, 'msg': 'pageNo/pageSize 必须为正整数'}), 400

        conditions = ['deleted = false']
        params = []

        # 设备ID
        device_id = request.args.get('device_id', '').strip()
        if device_id:
            conditions.append('device_id = %s')
            params.append(int(device_id) if device_id.isdigit() else device_id)

        # 告警类型
        event = request.args.get('event', '').strip()
        if event:
            conditions.append('alert_type = %s')
            params.append(event)

        # 告警对象映射
        obj = request.args.get('object', '').strip()
        if obj:
            types = obj_to_types(obj)
            ph = ','.join(['%s'] * len(types))
            conditions.append(f'alert_type IN ({ph})')
            params.extend(types)

        # 任务名称模糊匹配
        task_name = request.args.get('task_name', '').strip()
        if task_name:
            conditions.append('alert_id ILIKE %s')
            params.append(f'%{task_name}%')

        # 时间范围
        begin = request.args.get('begin_datetime', '').strip()
        end = request.args.get('end_datetime', '').strip()
        if begin:
            conditions.append('alert_time >= %s')
            params.append(begin)
        if end:
            conditions.append('alert_time <= %s')
            params.append(end)

        # 业务标签 (JSONB)
        tags_str = request.args.get('business_tags', '').strip()
        if tags_str:
            tags = [t.strip() for t in tags_str.split(',') if t.strip()]
            if tags:
                tag_conds = ["metadata->>'business_tags' ILIKE %s" for _ in tags]
                conditions.append(f"({' OR '.join(tag_conds)})")
                params.extend([f'%{t}%' for t in tags])

        where = ' AND '.join(conditions)

        conn = get_conn()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                # 总数
                cur.execute(f'SELECT COUNT(*) as cnt FROM iot_alert WHERE {where}', params)
                total = cur.fetchone()['cnt']

                # 分页
                offset = (page_no - 1) * page_size
                cur.execute(
                    f'SELECT * FROM iot_alert WHERE {where} ORDER BY alert_time DESC LIMIT %s OFFSET %s',
                    params + [page_size, offset]
                )
                rows = cur.fetchall()
        finally:
            conn.close()

        return jsonify({
            'code': 0, 'msg': 'success',
            'data': {'alert_list': [row_to_dict(r) for r in rows], 'total': total}
        })
    except Exception as e:
        log.exception('alert_page error')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@app.route('/video/alert/statistics', methods=['GET'])
def alert_statistics():
    try:
        conn = get_conn()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                stats = {}
                cur.execute("SELECT COUNT(*) as cnt FROM iot_alert WHERE deleted = false")
                stats['total'] = cur.fetchone()['cnt']

                cur.execute("SELECT COUNT(*) as cnt FROM iot_alert WHERE deleted = false AND status = 'pending'")
                stats['pending'] = cur.fetchone()['cnt']

                cur.execute("SELECT COUNT(*) as cnt FROM iot_alert WHERE deleted = false AND alert_time >= CURRENT_DATE")
                stats['today'] = cur.fetchone()['cnt']

                cur.execute("SELECT alert_type, COUNT(*) as cnt FROM iot_alert WHERE deleted = false GROUP BY alert_type")
                stats['by_type'] = {r['alert_type']: r['cnt'] for r in cur.fetchall()}

                cur.execute("SELECT alert_level, COUNT(*) as cnt FROM iot_alert WHERE deleted = false GROUP BY alert_level")
                stats['by_level'] = {r['alert_level']: r['cnt'] for r in cur.fetchall()}
        finally:
            conn.close()

        return jsonify({'code': 0, 'msg': 'success', 'data': stats})
    except Exception as e:
        log.exception('statistics error')
        return jsonify({'code': 500, 'msg': str(e)}), 500


@app.route('/video/alert/count', methods=['GET'])
def alert_count():
    try:
        device_id = request.args.get('device_id', '').strip()
        conditions = ['deleted = false']
        params = []
        if device_id:
            conditions.append('device_id = %s')
            params.append(int(device_id) if device_id.isdigit() else device_id)

        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(f'SELECT COUNT(*) FROM iot_alert WHERE {" AND ".join(conditions)}', params)
                total = cur.fetchone()[0]
        finally:
            conn.close()
        return jsonify({'code': 0, 'msg': 'success', 'data': total})
    except Exception as e:
        return jsonify({'code': 500, 'msg': str(e)}), 500


@app.route('/video/alert/delete/<int:alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    try:
        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE iot_alert SET deleted = true, update_time = NOW() WHERE id = %s AND deleted = false",
                    [alert_id]
                )
                affected = cur.rowcount
            conn.commit()
        finally:
            conn.close()

        if affected == 0:
            return jsonify({'code': 404, 'msg': '告警记录不存在'}), 404
        return jsonify({'code': 0, 'msg': '删除成功'})
    except Exception as e:
        return jsonify({'code': 500, 'msg': str(e)}), 500


@app.route('/video/alert/clear', methods=['DELETE'])
def clear_by_task():
    try:
        task_name = request.args.get('task_name', '').strip()
        if not task_name:
            return jsonify({'code': 400, 'msg': '缺少 task_name 参数'}), 400

        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE iot_alert SET deleted = true, update_time = NOW() WHERE alert_id ILIKE %s AND deleted = false",
                    [f'%{task_name}%']
                )
                cnt = cur.rowcount
            conn.commit()
        finally:
            conn.close()
        return jsonify({'code': 0, 'msg': f'已清空 {cnt} 条告警', 'data': cnt})
    except Exception as e:
        return jsonify({'code': 500, 'msg': str(e)}), 500


@app.route('/video/alert/clear/all', methods=['DELETE'])
def clear_all():
    try:
        conn = get_conn()
        try:
            with conn.cursor() as cur:
                cur.execute("UPDATE iot_alert SET deleted = true, update_time = NOW() WHERE deleted = false")
                cnt = cur.rowcount
            conn.commit()
        finally:
            conn.close()
        return jsonify({'code': 0, 'msg': f'已清空 {cnt} 条告警', 'data': cnt})
    except Exception as e:
        return jsonify({'code': 500, 'msg': str(e)}), 500


@app.route('/video/alert/record/query', methods=['GET'])
def query_alert_record():
    try:
        device_id = request.args.get('device_id', '').strip()
        alert_time = request.args.get('alert_time', '').strip()
        if not device_id or not alert_time:
            return jsonify({'code': 400, 'message': '缺少 device_id 或 alert_time'}), 400

        conn = get_conn()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute("""
                    SELECT video_clip_url, video_start_time, video_end_time
                    FROM iot_alert
                    WHERE device_id = %s AND alert_time <= %s::timestamp AND deleted = false
                    ORDER BY alert_time DESC LIMIT 1
                """, [int(device_id) if device_id.isdigit() else device_id, alert_time])
                row = cur.fetchone()
        finally:
            conn.close()

        if not row or not row['video_clip_url']:
            return jsonify({'code': 400, 'message': '暂未找到该时间段的录像文件'}), 400

        return jsonify({
            'code': 0, 'msg': 'success',
            'data': {
                'video_clip_url': row['video_clip_url'],
                'video_start_time': row['video_start_time'].strftime('%Y-%m-%d %H:%M:%S') if row['video_start_time'] else None,
                'video_end_time': row['video_end_time'].strftime('%Y-%m-%d %H:%M:%S') if row['video_end_time'] else None,
            }
        })
    except Exception as e:
        return jsonify({'code': 500, 'message': str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    log.info('alert-service starting on :%d', port)
    app.run(host='0.0.0.0', port=port, debug=False, threaded=True)
