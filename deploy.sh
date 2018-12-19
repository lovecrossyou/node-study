#!/bin/bash

# 应用名，用来查找进程
APP_NAME=app.js

# 引用工程路径
PROJECT_PATH=/Users/wangq/WebstormProjects/node-study/

cd $PROJECT_PATH
if [ $? -ne 0 ]; then
        echo "打开文件夹路径失败"
        exit 1
fi

echo "开始更新代码"
# 更新工程
git pull

if [ $? -ne 0 ]; then
        echo "更新代码失败，停止执行"
        exit 1
fi
echo "更新代码完成"

echo "查找当前服务进程"

# 获取应用的PID
PID=$(ps aux | grep $APP_NAME | grep -v grep | awk '{printf $2}')
if [ $? -ne 0 ]; then
        echo "查找当前服务进程失败，停止执行"
        exit 1
fi
echo "已找到查找当前服务"

echo "杀死当前服务进程"

# 如果应用正在运行，则强制终止进程
if [ -n "$PID" ];then
    kill $PID
fi

echo "重新启动应用"

# 启动应用
nohup node app.js &

exit 1
