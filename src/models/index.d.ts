import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Restaurant>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant>) => MutableModel<Restaurant> | void): Restaurant;
}