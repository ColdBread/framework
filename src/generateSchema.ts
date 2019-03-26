import { buildSchema, GraphQLSchema }  from'graphql';
import { ClassMetadata, FieldMetadata } from './definitions';
import graphql = require('graphql');


interface GeneratingMetadata {
    target: string;
    fields: FieldMetadata[];
}

interface QueryAndMutationMetadata {
    type: string;

}

interface QueryMetadata {
    target: Object;
    key: string;
    returnType: string;
    args: ArgMetadata[];
}

interface MutationMetadata {
    target: Object;
    key: string;
    returnType: string;
    args: ArgMetadata[];
}

interface ArgMetadata {
    target: string;
    propertyKey: string;
    parameterIndex: number;
    name: string;
    type: string;
}


export abstract class SchemaGenerator {

    static schema = ``;
    static devFlag = true;
    static typeDefs:GeneratingMetadata[] = [];
    static queriesAndMutations:QueryAndMutationMetadata[] = [];
    static argsTempStorage: ArgMetadata[] = [];
    static queriesMetadata: QueryMetadata[] = [];
    static mutationsMetadata: MutationMetadata[] = [];
    static root:{[key: string] : any} = {};
    
    

    static generateSchema(model: any[]): {schema: GraphQLSchema, root: any} {
        if(this.devFlag) {
            
            this.schema += this.generateTypes(this.typeDefs);
            this.schema += this.generateQueries(this.queriesMetadata);
            this.schema += this.generateMutations(this.mutationsMetadata);
            this.addResolversToQueries();
            this.addResolversToMutations();
            console.log(this.schema);
            return {schema: buildSchema(this.schema), root: this.root};
        } else {
            return {schema: buildSchema(this.schema), root: this.root};
        }
        
    }

    static addResolversToQueries():void {
        this.queriesMetadata.forEach(el => {
            let key = el.key;
            let target = el.target;
            let args = el.args.map((ele:ArgMetadata) => {
                return ele.name;
            });
            this.root[key] = this.createFunctionWithArgs(key, target,args);
        })
    }

    static addResolversToMutations():void {
        this.mutationsMetadata.forEach(el => {
            let key = el.key;
            let target = el.target;
            let args = el.args.map((ele:ArgMetadata) => {
                return ele.name;
            });
            this.root[key] = this.createFunctionWithArgs(key, target,args);
        })
    }

    static createFunctionWithArgs(key:string, target: Object, argument: string[]):Function {
        return eval(`({${argument}}) => {
            return target.constructor.prototype[key](${argument});
        }`);
        return new Function(...argument, `return resolver.prototype[key](${argument})`);
    }

    

    static addFieldMetadata(definition: FieldMetadata) {
        if(this.typeDefs.find(it => it.target === definition.target) !== undefined) {
            this.typeDefs.find(it => it.target === definition.target)!.fields.push(definition);
        } else {
            this.typeDefs.push({
                target: definition.target,
                fields: [definition]
            })
        }
    }

    static addArgMetadata(definition: ArgMetadata) {
        this.argsTempStorage.push(definition);
    }

    static addQueryMetadata(definition: QueryMetadata) {
        let args = this.argsTempStorage.filter(it => it.propertyKey=== definition.key).reverse();
        if(args){
            definition.args.push(...args);
            this.argsTempStorage = [];
        }
        this.queriesMetadata.push(definition);
    }

    static addMutationMetadata(definition: MutationMetadata) {
        let args = this.argsTempStorage.filter(it => it.propertyKey=== definition.key).reverse();
        if(args){
            definition.args.push(...args);
            this.argsTempStorage = [];
        }
        this.mutationsMetadata.push(definition);
    }

    private static generateTypes(typeDefs: GeneratingMetadata[]): string {
        let schema = ``;
        typeDefs.forEach(el => {
            schema+=`type ${el.target} {`;
            el.fields.forEach(field=> {
                schema+=`\n ${field.name}: ${field.type}`;
            });
            schema+=`\n }\n`;
        });
        return schema;
    }

    private static generateQueries(queriesMetadata: QueryMetadata[]): string {
        let schema = ``;
        schema += `type Query {\n`;
            queriesMetadata.forEach(el => {
                schema+=` ${el.key}`;
                if(el.args.length === 0) {
                    schema+=`: `;
                } else {
                    schema+=`(`;
                    for(let i = 0; i < el.args.length; i++) {
                        if(i === el.args.length - 1) {
                            schema+=`${el.args[i].name}: ${el.args[i].type}): `;
                        } else {
                            schema += `${el.args[i].name}: ${el.args[i].type}, `;
                        }
                    }
                }
                schema+=`${el.returnType} \n`;
            })
            schema+=`} \n`;
            return schema;
    }

    private static generateMutations(mutationsMetadata: MutationMetadata[]): string {
        let schema = ``;
        schema += `type Mutation {\n`;
            mutationsMetadata.forEach(el => {
                schema+=` ${el.key}`;
                if(el.args.length === 0) {
                    schema+=`: `;
                } else {
                    schema+=`(`;
                    for(let i = 0; i < el.args.length; i++) {
                        if(i === el.args.length - 1) {
                            schema+=`${el.args[i].name}: ${el.args[i].type}): `;
                        } else {
                            schema += `${el.args[i].name}: ${el.args[i].type}, `;
                        }
                    }
                }
                schema+=`${el.returnType} \n`;
            })
            schema+=`} \n`;
            return schema;
    }
    
}