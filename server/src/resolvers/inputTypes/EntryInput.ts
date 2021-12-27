import { InputType, Field } from "type-graphql";
import { Entry } from "../../entities/Entry";
import { IsDate, Length, MaxLength } from "class-validator";
import { IncomeExpenseType } from "../../types";
import { ObjectId } from "mongodb";

@InputType()
export class EntryInput implements Partial<Entry> {
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
  category?: ObjectId;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;
}
