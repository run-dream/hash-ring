# AGENTS

## Cursor Cloud specific instructions

This is a TypeScript library (`hash-ring`) implementing consistent hashing with virtual nodes. It is **not** a web application — there is no server or UI to start.

### Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Lint | `npx tslint -c tslint.json 'src/**/*.ts'` |
| Test | `npm test` |
| Type check | `npx tsc --noEmit` |
| Build | `npx tsc` (outputs to `dist/`) |

### Notes

- `mocha` and `ts-node` must be installed globally (`npm install -g mocha ts-node`) because `package.json` does not list `mocha` as a local dependency. The `npm test` script invokes `mocha` directly.
- TSLint reports many style violations in the existing code — these are pre-existing and should not be "fixed" unless explicitly requested.
- Build output goes to `dist/`. After building, the library can be used via `require('./dist/lib/hash-ring').default`.
