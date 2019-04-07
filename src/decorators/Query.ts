import { SchemaGenerator } from "../generateSchema";
import { checkTypeCompatibility } from "../util";

export function Query(arrayOptions?: string) : MethodDecorator {
  return (target: Object, key: string|symbol, descriptor: any) => {
    let t = Reflect.getMetadata("design:returntype",target,key);
    let f = descriptor.value;

    if(typeof key === "symbol"){
      return;
    }

    let returnType = arrayOptions ? arrayOptions : t.name;
    console.log(returnType);
    checkTypeCompatibility(target, key, returnType);

    if(returnType === "Number") {
      returnType = "Float";
    }

    SchemaGenerator.addQueryMetadata({
      target: target,
      key,
      returnType,
      args:[]
    })
  }
}