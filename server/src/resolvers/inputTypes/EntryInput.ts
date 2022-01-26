import { InputType, Field } from "type-graphql";
import { Entry } from "../../entities/Entry";
import { IsDate, Length, MaxLength } from "class-validator";
import { IncomeExpenseType } from "../../types";
import { mongoose } from "@typegoose/typegoose";

@InputType()
export class EntryInput implements Omit<Entry, "id" | "user" | "_doc" | "space"> {
  @Field((_type) => IncomeExpenseType)
  type: IncomeExpenseType;

  @Field()
  @IsDate()
  date: Date;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  amount: number;

  @Field((_type) => String, { nullable: true })
  category?: mongoose.Types.ObjectId;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;
}

@InputType()
export class EntryUpdateInput implements Partial<Entry> {
  @Field((_type) => IncomeExpenseType, { nullable: true })
  type?: IncomeExpenseType;

  @Field({ nullable: true })
  @IsDate()
  date?: Date;

  @Field({ nullable: true })
  @Length(1, 255)
  name?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field((_type) => String, { nullable: true })
  category?: mongoose.Types.ObjectId;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;
}
