import { buildSchema, GraphQLSchema }  from'graphql';
import { ClassMetadata, FieldMetadata } from './definitions';

interface GeneratingMetadata {
    target: string;
    fields: FieldMetadata[];
}

interface QueryAndMutationMetadata {
    type: string;

}

interface QueryMetadata {
    key: string;
    returnType: string;
    args: ArgMetadata[];
}

interface MutationMetadata {
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
    

    static generateSchema([model]: any): GraphQLSchema | void {
        if(this.devFlag) {
            //console.log("Hello World!");
            //console.log(`${this.schema} schema :(`);
            this.typeDefs.forEach(el => {
                //console.log("fieldTarget:");
                //console.log(el.target);
                this.schema+=`type ${el.target} {`;
                el.fields.forEach(field=> {
                    //console.log("fieldSpec:")
                    //console.log(`${field.name} : ${field.type}`);
                    this.schema+=`\n ${field.name}: ${field.type}`;
                });
                this.schema+=`\n }\n`;
            });
            
            this.schema += `type Query {\n`;
            this.queriesMetadata.forEach(el => {
                this.schema+=` ${el.key}`;
                if(el.args.length === 0) {
                    this.schema+=`: `;
                } else {
                    this.schema+=`(`;
                    //console.log("------el.args.length------");
                    //console.log(el.args.length);
                    for(let i = 0; i < el.args.length; i++) {
                        if(i === el.args.length - 1) {
                            this.schema+=`${el.args[i].name}: ${el.args[i].type}): `;
                        } else {
                            this.schema += `${el.args[i].name}: ${el.args[i].type}, `;
                        }
                    }
                }
                this.schema+=`${el.returnType} \n`;
            })
            this.schema+=`} \n`;

            this.schema += `type Mutation {\n`;
            this.mutationsMetadata.forEach(el => {
                this.schema+=` ${el.key}`;
                if(el.args.length === 0) {
                    this.schema+=`: `;
                } else {
                    this.schema+=`(`;
                    //console.log("------el.args.length------");
                    //console.log(el.args.length);
                    for(let i = 0; i < el.args.length; i++) {
                        if(i === el.args.length - 1) {
                            this.schema+=`${el.args[i].name}: ${el.args[i].type}): `;
                        } else {
                            this.schema += `${el.args[i].name}: ${el.args[i].type}, `;
                        }
                    }
                }
                this.schema+=`${el.returnType} \n`;
            })
            this.schema+=`} \n`;

/*
            this.schema+=`type Query {
    hello: String
}`*/
            console.log(this.schema);
            return buildSchema(this.schema);
        } else {
            return buildSchema(this.schema);
        }
        
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