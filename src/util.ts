import { SchemaTypeError } from "./error";

export function toUpperCaseSecondChar(word: string): string {
  return word.charAt(0)+word.charAt(1).toUpperCase()+word.slice(2);
}

export function checkTypeCompatibility(target: object, key: string,type: string) : void {
  if(type === "Array" || type === "Object"){
    throw new SchemaTypeError(target.constructor.name, key, type);
  }
}