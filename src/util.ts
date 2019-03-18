export function toUpperCaseSecondChar(word: string): string {
  return word.charAt(0)+word.charAt(1).toUpperCase()+word.slice(2);
}