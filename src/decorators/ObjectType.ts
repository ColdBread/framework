import { SchemaGenerator } from '../generateSchema';
import "reflect-metadata";
export function hi() {
    console.log("Hi");
}
/*
export function ObjectType(): ClassDecorator {

    

    return target => {
        var t = Reflect.getMetadata("design:type", target);

        console.log(`type: ${t.name}`);

        SchemaGenerator.addObjectType({
            name: target.name,
            target,
        })
    }
}
*/

export function ObjectType(target: any) {
    let original = target;
    //console.log("--------target ObjectType-------");
    //console.log(target.name);
}