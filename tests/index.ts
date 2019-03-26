import { SchemaGenerator, Arg } from "../src";
import { Author } from "./models/Author";
import { Post } from "./models/Post";
import { AuthorResolver } from "./models/AuthorResolver";
/*
let numbers: number[] = [1,2,3,4,56,7,8,9];
let kek = numbers.find(it => it > 20);
console.log(kek);

class lol {
  hello!: ( @Arg("helloString") helloString: string) => string {
    return helloString;
  };

}
*/
const { schema, root } = SchemaGenerator.generateSchema([Author, Post, AuthorResolver]);
/*
let root = {
  author: ({ postTitle } :{ [key:string]:string }) => {
    return AuthorResolver.prototype.author(postTitle);
  },
  keks: ({ lol, sobaka }: { [key:string]:any }) => {
    return AuthorResolver.prototype.keks(lol, sobaka);
  }
}
/**/ 
//console.log(root);
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

const port = 4000;

app.listen(port);
console.log(`Server is running on ${port}
Go to localhost:${port}/graphql`);
/**/
