import { Field } from "../../src";

export class Car {
  constructor(
    id:string, 
    brand:string, 
    price:string, 
    model:string, 
    manufacturedIn:number) {
      this.id = id;
      this.brand = brand;
      this.price = price;
      this.model = model;
      this.manufacturedIn = manufacturedIn;
  }
  @Field("ID")
  public id:string;
  @Field()
  public brand:string;
  @Field()
  public price:string;
  @Field()
  public model:string;
  @Field()
  public manufacturedIn:number;
}