import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { IncomeExpenseType, Ref } from "../types";
import { Category } from "./Category";

@ObjectType({ description: "The Entry model for income and expense rows." })
export class Entry {
  @Field(() => ID)
  id: string;

  @Field((_type) => IncomeExpenseType)
  @Property({ required: true })
  type: IncomeExpenseType;

  @Field()
  @Property({ default: new Date(), required: true })
  date: Date;

  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: true })
  amount: number;

  @Field((_type) => Category, { nullable: true })
  @Property({ ref: () => Category, nullable: true })
  category?: Ref<Category>;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  _doc: Entry;
}

export const EntryModel = getModelForClass(Entry);
