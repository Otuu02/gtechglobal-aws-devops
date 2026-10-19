# Deployment

## Local Development

pnpm install
docker compose up -d
pnpm dev

- Web:  http://localhost:3000
- API:  http://localhost:4000
- Docs: http://localhost:4000/api/docs

## Staging / Production

Prerequisites: Node 20, pnpm 9, PostgreSQL 16, Redis 7, reverse proxy with TLS.

Build:
  pnpm install --frozen-lockfile
  pnpm build

Migrate:
  pnpm --filter @gtechglobal/api db:migrate

Start:
  docker compose up -d

Verify:
  curl -f http://localhost:4000/api/v1/health
  curl -f http://localhost:3000

## Rollback

  docker compose down
  git checkout <previous-tag>
  pnpm build && docker compose up -d
