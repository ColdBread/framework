import { Car } from "./Car";
import { Query, Mutation, Arg } from "../../src";
const uuid = require('uuid/v4');

export interface CarInput {
  id: string
  brand: string
  price: string
  model: string
  manufacturedIn: number
}

export class CarRepository {
  
  //Fake database
  static carsStorage = [
    new Car("781jhfj189", "Tesla", "60 000", "Model S", 2016),
    new Car("9fnu278erh", "BMW", "120 000", "X7", 2019)
  ];

  @Query("[Car]")
  public static getCars(): Car[]{
    return this.carsStorage;
  }

  @Mutation()
  public static addCar(
    @Arg("brand") brand:string, 
    @Arg("price") price:string,
    @Arg("model") model:string,
    @Arg("manufacturedIn") manufacturedIn:number
    ): Car {
    let createdCar = new Car(uuid(), brand, price, model, manufacturedIn);
    this.carsStorage.push(createdCar);
    return createdCar;
  }

  @Query()
  public static getCar( @Arg("id") id:string): Car {
    let car = this.carsStorage.find(el => el.id === id);
    if(car) {
      return car;
    } else {
      throw new Error();
    }
  }

  @Query()
  public static updateCar(
    @Arg("id") id:string,
    @Arg("brand") brand:string, 
    @Arg("price") price:string,
    @Arg("model") model:string,
    @Arg("manufacturedIn") manufacturedIn:number
    ): Car {
    let updateCar = this.carsStorage.find(el => el.id === id);
    if(updateCar) {
      updateCar.brand = brand || updateCar.brand;
      updateCar.price = price || updateCar.price;
      updateCar.model = model || updateCar.model;
      updateCar.manufacturedIn = manufacturedIn || updateCar.manufacturedIn;
      return updateCar;
    } else {
      throw new Error();
    }
    
  }

  @Mutation()
  public static deleteCar(@Arg("id")id: string):Car {
    let deleteCar = this.carsStorage.find(el => el.id === id);
    if(deleteCar) {
      this.carsStorage.splice(this.carsStorage.indexOf(deleteCar),1);
      return deleteCar;
    } else {
      throw new Error();
    }
  }
}