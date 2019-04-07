import { SchemaGenerator } from "../generateSchema";
import { checkTypeCompatibility } from "../util";

export function Arg(name: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if(typeof propertyKey === "symbol"){
      return;
    }

    let types = Reflect.getMetadata("design:paramtypes", target, propertyKey);

    let type = types[parameterIndex].name;


    checkTypeCompatibility(target, propertyKey, type);

    if(type === "Number") {
      type = "Float";
    }
    
    SchemaGenerator.addArgMetadata({
      target: target.constructor.name,
      propertyKey,
      parameterIndex,
      name,
      type
    });
  }
}
