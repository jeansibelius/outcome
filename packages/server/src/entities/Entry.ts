import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, Ref } from "@typegoose/typegoose";
import { Category } from "./Category";
import { User } from "./User";
import { Space } from "./Space";
import { IncomeExpenseType } from "../types";

@ObjectType({ description: "The Entry model for income and expense rows." })
export class Entry {
  @Field(() => ID)
  id!: string;

  @Field((_type) => IncomeExpenseType)
  @Property({ required: true })
  type!: IncomeExpenseType;

  @Field()
  @Property({ default: new Date(), required: true })
  date!: Date;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field()
  @Property({ required: true })
  amount!: number;

  @Field((_type) => User)
  @Property({ ref: () => User })
  user: Ref<User>;

  @Field((_type) => Space)
  @Property({ ref: () => Space, required: true })
  space: Ref<Space>;

  @Field((_type) => Category, { nullable: true })
  @Property({ ref: () => Category, nullable: true })
  category?: Ref<Category>;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  _doc!: Entry;
}
