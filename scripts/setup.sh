#!/usr/bin/env bash
set -e
echo "→ Installing dependencies"
pnpm install
echo "→ Starting Docker services"
docker compose up -d
echo "→ Copying env files"
cp -n .env.example apps/api/.env || true
cp -n .env.example apps/web/.env || true
echo "✅ Setup complete. Run: pnpm dev"
