import { SchemaGenerator } from "../generateSchema";

export function Arg(name: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if(typeof propertyKey === "symbol"){
      return;
    }
    /*console.log("-------Arg target--------");
    console.log(target.constructor.name);
    console.log("-----Arg propertyKey----");
    console.log(propertyKey);
    console.log("----Arg parameterIndex---");
    console.log(parameterIndex);
    console.log("---Arg name----");
    console.log(name);
    console.log("---Arg type---");*/
    let types = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    //let t = Reflect.getMetadata("design:type",target,);
    //console.log(types[parameterIndex].name);
    //console.log(t.name);

    
    SchemaGenerator.addArgMetadata({
      target: target.constructor.name,
      propertyKey,
      parameterIndex,
      name,
      type: types[parameterIndex].name
    });
  }
}
