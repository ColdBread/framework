import { SchemaGenerator } from "../generateSchema";
import { checkTypeCompatibility } from "../util";

export function Mutation(): MethodDecorator {
  return (target: Object, key: string|symbol, descriptor: any) => {
    if(typeof key === "symbol"){
      return;
    }
    let t = Reflect.getMetadata("design:returntype",target,key);
    let type = t.name;
    checkTypeCompatibility(target, key, type);

    if(type === "Number") {
      type = "Float";
    }

    SchemaGenerator.addMutationMetadata({
      target,
      key,
      returnType: type,
      args: []
    })

  }
}