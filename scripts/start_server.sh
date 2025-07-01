#!/bin/bash
set -e

# Запускаем (или перезапускаем) сервер через pm2
# Если pm2 еще не установлен, установите глобально в install_server_deps.sh: npm install -g pm2
cd /home/ec2-user/quickshop/server

# Остановим старую версию, если она есть
pm2 delete quickshop || true

# Запустим новую
pm2 start app.js --name quickshop
