import { buildSchema, GraphQLSchema }  from'graphql';
import { ClassMetadata, FieldMetadata } from './definitions';
import graphql = require('graphql');
import { AuthorResolver } from '../tests/models/AuthorResolver';

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

interface QueryLol {
    [key:string]: any;
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
    public static resolvers:any[] = [];
    
    

    static generateSchema(model: any[]): {schema: GraphQLSchema, root: any} {
        if(this.devFlag) {
            this.resolvers = model;
            //console.log("Hello World!");
            //console.log(`${this.schema} schema :(`);
            
            this.schema += this.generateTypes(this.typeDefs);
            this.schema += this.generateQueries(this.queriesMetadata);
            this.schema += this.generateMutations(this.mutationsMetadata);
            
            this.queriesMetadata.forEach(el => {
                let keY = el.key;
                let target = el.target;
                let args = el.args.map((ele:ArgMetadata) => {
                    return ele.name;
                })
                console.log(args);
                
                let argumen:{[key: string] : any} = {}
                args.forEach(arg => {
                    argumen[arg] = "";
                })

                //let argumen = { ...args};
                console.log(Object.keys(argumen));
                //console.log(key);
                //console.log(target.constructor.prototype[key]);
                this.root[keY] = this.createFunctionWithArgs(argumen, keY, target, this.resolvers);
            })

            this.mutationsMetadata.forEach(el => {
                let key = el.key;
                let target = el.target;
                //console.log(key);
                //console.log(target.constructor.prototype[key]);
                this.root[key] = target.constructor.prototype[key];
            })


            //let key = this.queriesMetadata[0].key;
            //let target = this.queriesMetadata[0].target;
             
            //console.log();
            

/*
            this.schema+=`type Query {
    hello: String
}`*/
            console.log(this.schema);
            return {schema: buildSchema(this.schema), root: this.root};
        } else {
            return {schema: buildSchema(this.schema), root: this.root};
        }
        
    }

    static createFunctionWithArgs(args: {[key:string]:any}, key:string, target: Object, resolvers: any[]):Function {
        console.log(`{${Object.keys(args)}}`);
        console.log(resolvers);
        //eval(`let ${target} = resolvers.find(el => el.constructor.name === "${target}" ); `);
        /*
        return new Function(`{${Object.keys(args)}}`,`{
            let SchemaGenerator  = require('./generateSchema');
            return SchemaGenerator.resolvers.find(el => el.constructor.name === "${target}" ).constructor.prototype[${key}](${Object.keys(args)});
        }`);
        */
        return eval(`({${Object.keys(args)}})=> {
            ${target}.constructor.prototype[${key}](${Object.keys(args)});
        }`);
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
        //console.log(`pushed ${definition.name} to argsStorage`);
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
            //console.log("fieldTarget:");
            //console.log(el.target);
            schema+=`type ${el.target} {`;
            el.fields.forEach(field=> {
                //console.log("fieldSpec:")
                //console.log(`${field.name} : ${field.type}`);
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
                    //console.log("------el.args.length------");
                    //console.log(el.args.length);
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
                    //console.log("------el.args.length------");
                    //console.log(el.args.length);
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
    /*
    static addObjectType(definition: ClassMetadata) {
        this.schema+= definition.name;
        this.schema+= "{object definition}";
    }

    static addClassFieldMetadata(definition: FieldMetadata) {
        this.schema+= definition.name;
        this.schema+= "{field definition}";
    }

    static FieldMetadata(definition: FieldMetadata) {
        //this.configMap.set(definition.target, definition);
    }
*/
    
}