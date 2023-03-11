import { InputType, Field } from "type-graphql";
import { Category } from "../../entities/Category";
import { Length, MaxLength } from "class-validator";
import { IncomeExpenseType } from "../../types";

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field((_type) => IncomeExpenseType)
  type!: IncomeExpenseType;

  @Field()
  @Length(1, 255)
  name!: string;

  @Field({ nullable: true })
  monthlyBudget?: number;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

  @Field({ nullable: true })
  icon?: string;
}

@InputType()
export class CategoryUpdateInput implements Partial<Category> {
  @Field((_type) => IncomeExpenseType, { nullable: true })
  type?: IncomeExpenseType;

  @Field({ nullable: true })
  @Length(1, 255)
  name?: string;

  @Field({ nullable: true })
  monthlyBudget?: number;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

  @Field({ nullable: true })
  icon?: string;
}
