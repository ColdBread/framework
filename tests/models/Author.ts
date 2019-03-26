import { ObjectType, Field } from "../../src";
import { Post } from "./Post";

//@ObjectType
export class Author {

  @Field("ID")
  id!: string;

  @Field()
  name!: string;

  @Field("[Post]")
  posts!: Post[];

  @Field("[Float]")
  phone!: number[];

  @Field("[String]")
  tags!: string[];


}
