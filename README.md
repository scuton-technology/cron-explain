<div align="center">
  <br>
  <h1>cron-explain</h1>
  <p><strong>Explain cron expressions in plain English</strong></p>
  <br>
  <p>
    <a href="https://www.npmjs.com/package/@scuton/cron-explain"><img src="https://img.shields.io/npm/v/@scuton/cron-explain?color=2563eb&label=npm" alt="npm"></a>
    <a href="https://www.npmjs.com/package/@scuton/cron-explain"><img src="https://img.shields.io/npm/dm/@scuton/cron-explain?color=gray&label=downloads" alt="downloads"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/types-TypeScript-3178c6" alt="typescript"></a>
  </p>
  <br>
</div>

> Explain cron expressions in plain English. Never wonder what `0 */2 * * *` means again.

## Highlights

- ✅ Human-readable explanations — `"*/5 * * * *"` → `"Every 5 minutes"`
- ✅ CLI + Library — use from terminal or import in your code
- ✅ All standard patterns — `*`, `*/N`, `N`, `N-M`, `N,M,O`
- ✅ Full 5-field cron — minute, hour, day, month, day of week
- ✅ Zero dependencies
- ✅ TypeScript support

## Install

```sh
npm install @scuton/cron-explain
```

## CLI

```sh
npx @scuton/cron-explain "*/5 * * * *"
# Every 5 minutes

npx @scuton/cron-explain "0 */2 * * *"
# Every 2 hours

npx @scuton/cron-explain "30 9 * * 1-5"
# At 9:30 AM, Monday through Friday

npx @scuton/cron-explain "0 0 1 * *"
# At 12:00 AM, on day 1, of every month

npx @scuton/cron-explain "0 9 * * 1,3,5"
# At 9:00 AM, on Monday, Wednesday, Friday

npx @scuton/cron-explain "0 0 1 6 *"
# At 12:00 AM, on day 1, in June, of every month
```

## Programmatic Usage

```typescript
import { explain } from '@scuton/cron-explain';

explain('*/5 * * * *');     // 'Every 5 minutes'
explain('0 9 * * 1-5');     // 'At 9:00 AM, Monday through Friday'
explain('0 0 1 * *');       // 'At 12:00 AM, on day 1, of every month'

// Use it in your monitoring dashboard
const jobs = [
  { name: 'cleanup',  cron: '0 3 * * *' },
  { name: 'backup',   cron: '0 0 * * 0' },
  { name: 'report',   cron: '0 9 * * 1' },
];

for (const job of jobs) {
  console.log(`${job.name}: ${explain(job.cron)}`);
}
// cleanup: At 3:00 AM
// backup: At 12:00 AM, on Sunday
// report: At 9:00 AM, on Monday
```

## Supported Patterns

| Expression | Explanation |
|-----------|-------------|
| `* * * * *` | Every minute |
| `*/5 * * * *` | Every 5 minutes |
| `*/15 * * * *` | Every 15 minutes |
| `0 */2 * * *` | Every 2 hours |
| `0 9 * * *` | At 9:00 AM |
| `0 12 * * *` | At 12:00 PM |
| `30 9 * * 1-5` | At 9:30 AM, Monday through Friday |
| `0 0 1 * *` | At 12:00 AM, on day 1, of every month |
| `0 0 1 6 *` | At 12:00 AM, on day 1, in June |
| `0 9 * * 1,3,5` | At 9:00 AM, on Monday, Wednesday, Friday |

### Cron field reference

```
┌───────── minute (0–59)
│ ┌───────── hour (0–23)
│ │ ┌───────── day of month (1–31)
│ │ │ ┌───────── month (1–12)
│ │ │ │ ┌───────── day of week (0–6, Sunday = 0)
│ │ │ │ │
* * * * *
```

Supported syntax: `*` (any), `N` (specific), `N,M` (list), `N-M` (range), `*/N` (step).

## API

### explain(expression)

Convert a 5-field cron expression to a human-readable string.

Returns: `string`

Throws if the expression doesn't have exactly 5 fields.

#### expression

Type: `string`

A standard 5-field cron expression like `"0 9 * * 1-5"`.

## FAQ

### Does it support 6-field cron (with seconds)?

Not currently. It supports the standard 5-field format used by crontab, most CI/CD systems, and cloud schedulers.

### Does it validate the expression?

It validates the field count (must be 5) but doesn't validate value ranges. `"99 99 99 99 99"` will produce output but won't be a valid cron schedule.

## Related

- [@scuton/ms-convert](https://github.com/scuton-technology/ms-convert) — Convert time strings to milliseconds

## License

MIT © [Scuton Technology](https://scuton.com)
