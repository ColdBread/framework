import { SchemaGenerator } from "../generateSchema";
import { toUpperCaseSecondChar } from "../util";
import "reflect-metadata";

export function hello() {
    console.log("HEllo");
}

export function Field(arrayOptions?: string):  PropertyDecorator {
    return (target, key) => {
        if(typeof key === "symbol"){
            return;
        }
        let t = Reflect.getMetadata("design:type", target, key);
        SchemaGenerator.addFieldMetadata({
            name: key,
            target: target.constructor.name,
            type: arrayOptions ? toUpperCaseSecondChar(arrayOptions) : t.name
        })
    };
}
/*
export function Field(target: any, key: string) {
    //console.log("---------target Field--------");
    //console.log(target.constructor.name);
    //console.log("--------key Field-------");
    //console.log(key);
    //console.log("-----------type Field---------");
    let t = Reflect.getMetadata("design:type", target, key);
    //console.log(t.name);
    SchemaGenerator.addFieldMetadata({
        target: target.constructor.name,
        name: key,
        type: t.name
    });
}
*/


