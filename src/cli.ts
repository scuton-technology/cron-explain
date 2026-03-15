import { explain } from './lib/explainer';

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
cron-explain — Explain cron expressions in plain English

Usage:
  cron-explain "<expression>"

Examples:
  cron-explain "*/5 * * * *"
  cron-explain "0 9 * * 1-5"
  cron-explain "0 0 1 * *"
`);
  process.exit(0);
}

const expression = args.join(' ');
try {
  console.log(explain(expression));
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
