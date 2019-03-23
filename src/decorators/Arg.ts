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
    let type = types[parameterIndex].name;
    let values = Object.keys(types[parameterIndex]);
    console.log(types[parameterIndex]);
    console.log(types[parameterIndex]);
    //console.log(Object.entries(types[parameterIndex]));
    //console.log(type);
    //console.log(values);
    
    SchemaGenerator.addArgMetadata({
      target: target.constructor.name,
      propertyKey,
      parameterIndex,
      name,
      type
    });
  }
}
