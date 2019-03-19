export function Mutation(): MethodDecorator {
  return (target: Object, key: string|symbol, descriptor: any) => {
    console.log("----Mutation target---");
    console.log(target);
    console.log("--Mutation key---");
    console.log( key || "kek");
    console.log("---Mutation descriptor---");
    console.log(descriptor);
    console.log("--Mutation return type---");
    let t = Reflect.getMetadata("design:returntype",target,key);
    console.log(t.name);

  }
}