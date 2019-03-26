import { SchemaGenerator } from "../generateSchema";
import { checkTypeCompatibility } from "../util";

export function Query(arrayOptions?: string) : MethodDecorator {
  return (target: Object, key: string|symbol, descriptor: any) => {
    /*
    console.log("----Query target---");
    console.log(target);
    console.log("--Query key---");
    console.log( key || "kek");
    console.log("---Query descriptor---");
    console.log(descriptor);
    console.log("--Query return type---");*/
    let t = Reflect.getMetadata("design:returntype",target,key);
    //console.log(arrayOptions ? arrayOptions : t.name);
    let f = descriptor.value;
    //console.log(f);

    if(typeof key === "symbol"){
      return;
    }

    let returnType = arrayOptions ? arrayOptions : t.name;

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