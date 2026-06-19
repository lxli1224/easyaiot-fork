#!/bin/bash
# EasyAIoT Edge Box — 远程运维接入（SSH 反向隧道）
# 盒子插电联网后执行一次，自动建立到阿里云的 SSH 反向通道
# 用法：bash edgebox-setup.sh [盒子编号] [隧道端口号]

set -e

BOX_ID="${1:-box-$(hostname)}"
TUNNEL_PORT="${2:-22001}"
RELAY_HOST="47.97.32.241"
RELAY_USER="root"

echo "=========================================="
echo " EasyAIoT 边缘盒子 — SSH 反向隧道接入"
echo " 盒子编号: ${BOX_ID}"
echo " 隧道端口: ${TUNNEL_PORT}"
echo "=========================================="

# 1. 生成 SSH 密钥（如果没有）
if [ ! -f /root/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N "" -q
  echo "✓ SSH 密钥已生成"
else
  echo "✓ SSH 密钥已存在"
fi

# 2. 写 systemd 服务（保持反向隧道永不断）
cat > /etc/systemd/system/iot-tunnel.service << SERVICE_EOF
[Unit]
Description=EasyAIoT SSH Reverse Tunnel (${BOX_ID})
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/ssh \
  -o StrictHostKeyChecking=accept-new \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -o ExitOnForwardFailure=yes \
  -N -R ${TUNNEL_PORT}:localhost:22 \
  ${RELAY_USER}@${RELAY_HOST}
Restart=always
RestartSec=15
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE_EOF

systemctl daemon-reload
systemctl enable iot-tunnel
systemctl restart iot-tunnel
sleep 3

if systemctl is-active iot-tunnel > /dev/null 2>&1; then
  echo "✓ 隧道服务运行中"
  echo ""
  echo "=========================================="
  echo " ✅ 接入成功！${BOX_ID}"
  echo ""
  echo " 运维方式："
  echo "   1. SSH 到阿里云：ssh ${RELAY_USER}@${RELAY_HOST}"
  echo "   2. 跳到盒子  ：ssh root@localhost -p ${TUNNEL_PORT}"
  echo "=========================================="
else
  echo "❌ 启动失败，检查日志："
  journalctl -u iot-tunnel --no-pager -n 15
  exit 1
fi
