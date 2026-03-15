<div align="center">

# cron-explain

**Explain cron expressions in plain English. CLI + Library.**

[![npm](https://img.shields.io/npm/v/@scuton/cron-explain?style=flat-square)](https://www.npmjs.com/package/@scuton/cron-explain)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](package.json)

</div>

---

## Install

```bash
npm install @scuton/cron-explain
```

## CLI Usage

```bash
npx @scuton/cron-explain "*/5 * * * *"     # Every 5 minutes
npx @scuton/cron-explain "0 9 * * 1-5"     # At 9:00 AM, Monday through Friday
npx @scuton/cron-explain "0 0 1 * *"       # At 12:00 AM, on day 1, of every month
npx @scuton/cron-explain "0 */2 * * *"     # Every 2 hours
```

## Programmatic API

```typescript
import { explain } from '@scuton/cron-explain';

explain('*/5 * * * *');    // "Every 5 minutes"
explain('0 9 * * 1-5');    // "At 9:00 AM, Monday through Friday"
explain('0 0 1 * *');      // "At 12:00 AM, on day 1, of every month"
```

## Supported Patterns

| Expression | Result |
|-----------|--------|
| `* * * * *` | Every minute |
| `*/5 * * * *` | Every 5 minutes |
| `0 */2 * * *` | Every 2 hours |
| `30 9 * * 1-5` | At 9:30 AM, Monday through Friday |
| `0 0 1 * *` | At 12:00 AM, on day 1, of every month |
| `0 9 * * 1,3,5` | At 9:00 AM, on Monday, Wednesday, Friday |
| `0 0 1 6 *` | At 12:00 AM, on day 1, in June |

Supports: `*` (any), `N` (specific), `N,M` (list), `N-M` (range), `*/N` (step).

## License

MIT — [Scuton Technology](https://scuton.com)
