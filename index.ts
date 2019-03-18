import { SchemaGenerator } from "./src";
import { Author } from "./models/Author";
import { Post } from "./models/Post";
/*
let numbers: number[] = [1,2,3,4,56,7,8,9];
let kek = numbers.find(it => it > 20);
console.log(kek);
*/
const mySchema = SchemaGenerator.generateSchema([Author, Post]);

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: mySchema,
  graphiql: true
}));

app.listen(4000);

