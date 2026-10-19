# GTECHGLOBAL OS — Architecture

## Layers

1. **Presentation** — Next.js 14 App Router, Tailwind CSS
2. **Identity** — JWT + MFA (TOTP) + RBAC
3. **Core Domain** — NestJS modular monolith
4. **Workflow** — Approvals, triggers, SLAs
5. **Integration** — Adapters for G Wash, payments, email
6. **AI** — Agent gateway with guardrails
7. **Data** — PostgreSQL 16 + Redis 7
8. **Observability** — Logs, metrics, traces, audit

## Principle

Start modular. Extract services only when scale or security justifies it.
