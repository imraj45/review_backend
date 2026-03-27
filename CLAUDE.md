# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sniffer Review Hub Backend — a NestJS 11 API server written in TypeScript. Currently at scaffold stage with the default AppModule/Controller/Service structure.

## Commands

```bash
npm install          # install dependencies
npm run build        # compile (nest build)
npm run start:dev    # dev server with watch mode (port 3000)
npm run lint         # eslint with auto-fix
npm run format       # prettier format
npm test             # unit tests (jest)
npx jest --testPathPattern=<pattern>  # run a single test file
npm run test:e2e     # e2e tests (uses test/jest-e2e.json config)
npm run test:cov     # test coverage
```

## Architecture

- **NestJS 11** with Express platform, TypeScript targeting ES2023, module resolution `nodenext`
- Entry point: `src/main.ts` — boots on `process.env.PORT ?? 3000`
- Root module: `src/app.module.ts` — registers controllers and providers
- Unit tests live alongside source as `*.spec.ts`; e2e tests live in `test/`

## Code Style

- ESLint flat config (`eslint.config.mjs`) with `typescript-eslint` type-checked rules + Prettier integration
- `@typescript-eslint/no-explicit-any` is **off**; `no-floating-promises` and `no-unsafe-argument` are **warn**
- Prettier: single quotes, trailing commas everywhere, auto line endings
- `strictNullChecks` enabled; `noImplicitAny` disabled
