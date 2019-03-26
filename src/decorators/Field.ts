import { SchemaGenerator } from "../generateSchema";
import { toUpperCaseSecondChar, checkTypeCompatibility } from "../util";
import "reflect-metadata";
import { SchemaTypeError } from "../error";

export function Field(arrayOptions?: string):  PropertyDecorator {
    return (target, key) => {
        if(typeof key === "symbol"){
            return;
        }
        let t = Reflect.getMetadata("design:type", target, key);

        let type = arrayOptions ? toUpperCaseSecondChar(arrayOptions) : t.name;
        
        checkTypeCompatibility(target, key, type);

        if(type === "Number"){
            type = "Float";
        }


        SchemaGenerator.addFieldMetadata({
            name: key,
            target: target.constructor.name,
            type
        })
    };
}



