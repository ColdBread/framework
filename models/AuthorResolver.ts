import { Author } from "./Author";
import { Query, Arg, Mutation } from "../src";

export class AuthorResolver {
  readonly items: Author[] = [new Author(), new Author()];
/*
  @Query
  async author(): Promise<Author | undefined> {
    return await this.items.find(el => el.name === "kek");
  }
  */
  @Query()
  author(@Arg("postTitle") postTitle: string): string {
    return postTitle;
  }
  
  @Mutation()
  changeName(@Arg("changedName") changedName: string): string {
    return changedName;
  }
  
}
