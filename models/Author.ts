import { ObjectType, Field } from "../src";
import { Post } from "./Post";

//@ObjectType
export class Author {

  @Field()
  name!: string;

  @Field("[Post]")
  posts!: Post[];

  @Field("[string]")
  tags!: string[];
}