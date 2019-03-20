import { ObjectType, Field } from "../../src";
import { Author } from "./Author";

//@ObjectType
export class Post {

  @Field()
  title!: string;

  @Field()
  author!: Author;
}
