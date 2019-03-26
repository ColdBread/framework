export class SchemaTypeError extends Error {
  constructor(target:string, name:string, type:string) {
    super(`The ${target}.${name} has uncompatible schema type '${type}'. Please check types in ${target} class`);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}