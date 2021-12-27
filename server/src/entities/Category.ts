import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { IncomeExpenseType } from "../types";

@ObjectType({ description: "The category model" })
export class Category {
  @Field(() => ID)
  id: string;

  @Field((_type) => IncomeExpenseType)
  @Property({ required: true })
  type: IncomeExpenseType;

  @Field()
  @Property({ required: true })
  name: string;

  @Field({ nullable: true })
  @Property()
  monthlyBudget?: number;

  @Field({ nullable: true })
  @Property()
  description?: string;

  @Field({ nullable: true })
  @Property()
  icon?: string;
}

export const CategoryModel = getModelForClass(Category);
