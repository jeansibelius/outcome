import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, Ref } from "@typegoose/typegoose";
import { IncomeExpenseType } from "../types";
import { Space } from "./Space";

@ObjectType({ description: "The category model" })
export class Category {
  @Field(() => ID)
  id!: string;

  @Field((_type) => IncomeExpenseType)
  @Property({ required: true })
  type!: IncomeExpenseType;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field((_type) => Space)
  @Property({ ref: () => Space, required: true })
  space: Ref<Space>;

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
