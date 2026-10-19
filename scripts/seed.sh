#!/usr/bin/env bash
set -e
echo "→ Running database seeds"
pnpm --filter @gtechglobal/api db:seed
echo "✅ Seed complete."
