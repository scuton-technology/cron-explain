const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

function parseCron(expression: string): CronParts {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error(`Invalid cron expression: expected 5 fields, got ${parts.length}`);
  }
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

function explainField(field: string, type: 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek'): string {
  if (field === '*') return '';

  // */N - every N
  const stepMatch = field.match(/^\*\/(\d+)$/);
  if (stepMatch) {
    const n = parseInt(stepMatch[1]);
    switch (type) {
      case 'minute': return `every ${n} minute${n > 1 ? 's' : ''}`;
      case 'hour': return `every ${n} hour${n > 1 ? 's' : ''}`;
      case 'dayOfMonth': return `every ${n} day${n > 1 ? 's' : ''}`;
      case 'month': return `every ${n} month${n > 1 ? 's' : ''}`;
      case 'dayOfWeek': return `every ${n} day${n > 1 ? 's' : ''} of the week`;
    }
  }

  // N-M range
  const rangeMatch = field.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const from = parseInt(rangeMatch[1]);
    const to = parseInt(rangeMatch[2]);
    switch (type) {
      case 'minute': return `minutes ${from} through ${to}`;
      case 'hour': return `between ${formatHour(from)} and ${formatHour(to)}`;
      case 'dayOfMonth': return `on days ${from} through ${to}`;
      case 'month': return `${MONTHS[from]} through ${MONTHS[to]}`;
      case 'dayOfWeek': return `${DAYS[from]} through ${DAYS[to]}`;
    }
  }

  // N,M,O list
  if (field.includes(',')) {
    const values = field.split(',').map(v => parseInt(v.trim()));
    switch (type) {
      case 'minute': return `at minute${values.length > 1 ? 's' : ''} ${values.join(', ')}`;
      case 'hour': return `at ${values.map(formatHour).join(', ')}`;
      case 'dayOfMonth': return `on day${values.length > 1 ? 's' : ''} ${values.join(', ')}`;
      case 'month': return `in ${values.map(v => MONTHS[v]).join(', ')}`;
      case 'dayOfWeek': return `on ${values.map(v => DAYS[v]).join(', ')}`;
    }
  }

  // Single value
  const val = parseInt(field);
  if (!isNaN(val)) {
    switch (type) {
      case 'minute': return `at minute ${val}`;
      case 'hour': return `at ${formatHour(val)}`;
      case 'dayOfMonth': return `on day ${val}`;
      case 'month': return `in ${MONTHS[val]}`;
      case 'dayOfWeek': return `on ${DAYS[val]}`;
    }
  }

  return '';
}

function formatHour(h: number): string {
  if (h === 0) return '12:00 AM';
  if (h === 12) return '12:00 PM';
  if (h < 12) return `${h}:00 AM`;
  return `${h - 12}:00 PM`;
}

function formatTime(minute: string, hour: string): string {
  const m = parseInt(minute);
  const h = parseInt(hour);
  if (isNaN(m) || isNaN(h)) return '';
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayMin = m.toString().padStart(2, '0');
  return `${displayHour}:${displayMin} ${period}`;
}

export function explain(expression: string): string {
  const parts = parseCron(expression);
  const segments: string[] = [];

  // Handle common patterns first
  // Every N minutes: */N * * * *
  if (parts.minute.startsWith('*/') && parts.hour === '*' && parts.dayOfMonth === '*' && parts.month === '*' && parts.dayOfWeek === '*') {
    const n = parseInt(parts.minute.split('/')[1]);
    return `Every ${n} minute${n > 1 ? 's' : ''}`;
  }

  // Every N hours: 0 */N * * *
  if (parts.minute === '0' && parts.hour.startsWith('*/') && parts.dayOfMonth === '*' && parts.month === '*' && parts.dayOfWeek === '*') {
    const n = parseInt(parts.hour.split('/')[1]);
    return `Every ${n} hour${n > 1 ? 's' : ''}`;
  }

  // Specific time patterns
  const hasSpecificTime = /^\d+$/.test(parts.minute) && /^\d+$/.test(parts.hour);

  if (hasSpecificTime) {
    const time = formatTime(parts.minute, parts.hour);
    segments.push(`At ${time}`);
  } else {
    // Handle minute
    if (parts.minute !== '*' && parts.minute !== '0') {
      segments.push(explainField(parts.minute, 'minute'));
    }
    // Handle hour
    if (parts.hour !== '*') {
      const hourExpl = explainField(parts.hour, 'hour');
      if (hourExpl) segments.push(hourExpl);
    }
    if (parts.minute === '*' && parts.hour === '*') {
      segments.push('Every minute');
    }
  }

  // Day of month
  if (parts.dayOfMonth !== '*') {
    segments.push(explainField(parts.dayOfMonth, 'dayOfMonth'));
  }

  // Month
  if (parts.month !== '*') {
    segments.push(explainField(parts.month, 'month'));
  }

  // Day of week
  if (parts.dayOfWeek !== '*') {
    const dowExpl = explainField(parts.dayOfWeek, 'dayOfWeek');
    if (dowExpl) {
      // For ranges like 1-5, use cleaner format
      if (parts.dayOfWeek === '1-5') {
        segments.push('Monday through Friday');
      } else {
        segments.push(dowExpl);
      }
    }
  }

  // Add "of every month" for day-specific patterns
  if (parts.dayOfMonth !== '*' && parts.month === '*') {
    segments.push('of every month');
  }

  return segments.join(', ');
}
