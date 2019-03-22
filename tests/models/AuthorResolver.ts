import { Author } from "./Author";
import { Query, Arg, Mutation } from "../../src";

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
    console.log(postTitle);
    return postTitle.toString();
  }

  @Query("[String]")
  keks(@Arg("lol") lol: string, @Arg("sobaka") sobaka: boolean): [string] {
    return ["bob"];
  }

  @Query()
  authorKek(@Arg("name") name: string): Author {
    return new Author();
  }
  
  @Mutation()
  changeName(@Arg("changedName") changedName: string): string {
    return changedName;
  }
  
}
