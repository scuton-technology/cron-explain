# @scuton/cron-explain

Explain cron expressions in plain English. Works as both a CLI tool and a library.

## Installation

```bash
npm install @scuton/cron-explain
```

Global install for CLI usage:

```bash
npm install -g @scuton/cron-explain
```

## CLI Usage

```bash
cron-explain "*/5 * * * *"
# Every 5 minutes

cron-explain "0 9 * * 1-5"
# At 9:00 AM, Monday through Friday

cron-explain "0 0 1 * *"
# At 12:00 AM, on day 1, of every month
```

## API Usage

```typescript
import { explain } from '@scuton/cron-explain';

explain('*/5 * * * *');   // "Every 5 minutes"
explain('0 9 * * 1-5');   // "At 9:00 AM, Monday through Friday"
explain('0 0 1 * *');     // "At 12:00 AM, on day 1, of every month"
```

### CommonJS

```javascript
const { explain } = require('@scuton/cron-explain');

console.log(explain('0 12 * * *')); // "At 12:00 PM"
```

## Examples

| Expression       | Explanation                                        |
| ---------------- | -------------------------------------------------- |
| `* * * * *`      | Every minute                                       |
| `*/5 * * * *`    | Every 5 minutes                                    |
| `*/15 * * * *`   | Every 15 minutes                                   |
| `0 */2 * * *`    | Every 2 hours                                      |
| `0 9 * * *`      | At 9:00 AM                                         |
| `0 12 * * *`     | At 12:00 PM                                        |
| `30 9 * * 1-5`   | At 9:30 AM, Monday through Friday                  |
| `0 0 1 * *`      | At 12:00 AM, on day 1, of every month              |
| `0 0 1 6 *`      | At 12:00 AM, on day 1, in June, of every month     |
| `0 9 * * 1,3,5`  | At 9:00 AM, on Monday, Wednesday, Friday           |

## Supported Cron Syntax

Standard 5-field cron expressions:

```
┌───────── minute (0-59)
│ ┌───────── hour (0-23)
│ │ ┌───────── day of month (1-31)
│ │ │ ┌───────── month (1-12)
│ │ │ │ ┌───────── day of week (0-6, Sunday=0)
│ │ │ │ │
* * * * *
```

Supported patterns:
- `*` — any value
- `N` — specific value
- `N,M` — list of values
- `N-M` — range of values
- `*/N` — every N

## License

MIT - Scuton Technology
