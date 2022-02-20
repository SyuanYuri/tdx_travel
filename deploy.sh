#!/usr/bin/env sh
# sh deploy.sh
# 發生錯誤時終止
set -e

# 構建
npm run build

# 進入構建資料夾
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/SyuanYuri/tdx_travel.git main:gh-pages

cd -