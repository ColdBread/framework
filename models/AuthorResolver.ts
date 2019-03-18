import { Author } from "./Author";
import { Query } from "../src";

export class AuthorResolver {
  readonly items: Author[] = [new Author(), new Author()];
/*
  @Query
  async author(): Promise<Author | undefined> {
    return await this.items.find(el => el.name === "kek");
  }
  */
}