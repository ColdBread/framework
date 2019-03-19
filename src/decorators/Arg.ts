export function Arg(name: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    console.log("-------Arg target--------");
    console.log(target.constructor.name);
    console.log("-----Arg propertyKey----");
    console.log(propertyKey);
    console.log("----Arg parameterIndex---");
    console.log(parameterIndex);
    console.log("---Arg name----");
    console.log(name);
  }
}
