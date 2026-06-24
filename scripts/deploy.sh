#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${DEPLOY_ENV:-$ROOT/.env.deploy}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Файл $ENV_FILE не найден."
  echo "Скопируйте .env.deploy.example → .env.deploy и заполните SFTP-данные."
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

: "${FTP_HOST:?Укажите FTP_HOST в .env.deploy}"
: "${FTP_USER:?Укажите FTP_USER в .env.deploy}"
: "${FTP_PASS:?Укажите FTP_PASS в .env.deploy}"
FTP_PORT="${FTP_PORT:-21}"
FTP_PROTOCOL="${FTP_PROTOCOL:-ftp}"
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-/www/numerokod.ru}"

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp не установлен. Установите: brew install lftp"
  exit 1
fi

echo "→ Деплой numerokod.ru на $FTP_PROTOCOL://$FTP_HOST:$FTP_REMOTE_DIR"

if [[ "$FTP_PROTOCOL" == "sftp" ]]; then
  LFTP_URL="sftp://$FTP_HOST:${FTP_PORT:-22}"
  LFTP_OPTS='set sftp:connect-program "ssh -a -x -o StrictHostKeyChecking=accept-new"'
else
  LFTP_URL="ftp://$FTP_HOST:$FTP_PORT"
  LFTP_OPTS="set ftp:passive-mode true
set ftp:ssl-force false
set ssl:verify-certificate false"
fi

lftp -u "$FTP_USER","$FTP_PASS" "$LFTP_URL" <<EOF
$LFTP_OPTS
set net:timeout 30
set net:max-retries 3
mkdir -p $FTP_REMOTE_DIR
cd $FTP_REMOTE_DIR
mirror -R --delete --verbose \
  --exclude .git/ \
  --exclude .gstack/ \
  --exclude .gitignore \
  --exclude .env.deploy \
  --exclude .env.deploy.example \
  --exclude node_modules/ \
  --exclude tests/ \
  --exclude scripts/ \
  --exclude numerokod_plan.md \
  --exclude images/og-image.html \
  --exclude-glob .DS_Store \
  "$ROOT" .
bye
EOF

echo "✓ Файлы загружены."
