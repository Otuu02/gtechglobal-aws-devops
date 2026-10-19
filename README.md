# GTECHGLOBAL OS

> The operational backbone of GTECHGLOBAL — Architect · Build · Operate · Scale

A centralized business operating platform that unifies people, projects, products,
clients, finances, technology, documents, workflows and AI automation into one
controlled environment.

## Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Web          | Next.js 14 · React 18 · TypeScript  |
| API          | NestJS 10 · TypeORM · PostgreSQL    |
| Cache        | Redis 7                             |
| Styling      | Tailwind CSS                        |
| Monorepo     | pnpm workspaces · Turborepo         |

## Quick Start

```bash
pnpm install
cp .env.example apps/api/.env
cp .env.example apps/web/.env
docker compose -f docker/docker-compose.yml up -d
pnpm dev
Web: http://localhost:3000

API: http://localhost:4000

Docs: http://localhost:4000/api/docs
