import { SchemaGenerator, Arg } from "../src";
import { CarRepository } from "./models/CarRepository";
import { Car } from "./models/Car";

const { schema, root } = SchemaGenerator.generateSchema([Car, CarRepository]);

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
