import { describe, it, expect } from 'vitest';
import { explain } from '../src/index';

describe('explain', () => {
  it('should explain every 5 minutes', () => {
    expect(explain('*/5 * * * *')).toBe('Every 5 minutes');
  });

  it('should explain every 2 hours', () => {
    expect(explain('0 */2 * * *')).toBe('Every 2 hours');
  });

  it('should explain every minute', () => {
    expect(explain('* * * * *')).toBe('Every minute');
  });

  it('should explain specific time on weekdays', () => {
    const result = explain('30 9 * * 1-5');
    expect(result).toContain('9:30 AM');
    expect(result).toContain('Monday through Friday');
  });

  it('should explain midnight on 1st of month', () => {
    const result = explain('0 0 1 * *');
    expect(result).toContain('12:00 AM');
    expect(result).toContain('day 1');
  });

  it('should explain specific day of week', () => {
    const result = explain('0 9 * * 1');
    expect(result).toContain('9:00 AM');
    expect(result).toContain('Monday');
  });

  it('should explain noon daily', () => {
    const result = explain('0 12 * * *');
    expect(result).toContain('12:00 PM');
  });

  it('should explain every hour', () => {
    expect(explain('0 */1 * * *')).toBe('Every 1 hour');
  });

  it('should throw on invalid expression', () => {
    expect(() => explain('invalid')).toThrow('Invalid cron expression');
  });

  it('should explain specific month', () => {
    const result = explain('0 0 1 6 *');
    expect(result).toContain('June');
  });

  it('should explain list of days', () => {
    const result = explain('0 9 * * 1,3,5');
    expect(result).toContain('Monday');
    expect(result).toContain('Wednesday');
    expect(result).toContain('Friday');
  });

  it('should explain every 15 minutes', () => {
    expect(explain('*/15 * * * *')).toBe('Every 15 minutes');
  });
});
