const isColorSupported =
  !('NO_COLOR' in process.env) &&
  ('FORCE_COLOR' in process.env || process.stdout.isTTY);

function colorize(code: number, text: string): string {
  return isColorSupported ? `\x1b[${code}m${text}\x1b[0m` : text;
}

export const bold = (text: string) => colorize(1, text);
export const dim = (text: string) => colorize(2, text);
export const red = (text: string) => colorize(31, text);
export const green = (text: string) => colorize(32, text);
export const yellow = (text: string) => colorize(33, text);
export const blue = (text: string) => colorize(34, text);
export const cyan = (text: string) => colorize(36, text);
export const gray = (text: string) => colorize(90, text);
