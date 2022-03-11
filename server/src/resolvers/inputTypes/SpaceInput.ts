import { Length } from "class-validator";
import { Space } from "../../entities/Space";
import { Field, InputType } from "type-graphql";
import { mongoose } from "@typegoose/typegoose";

@InputType()
export class SpaceInput implements Partial<Space> {
  @Field({ defaultValue: "Home" })
  @Length(1, 255)
  name?: string;

  @Field((_type) => [String], { nullable: true })
  users?: mongoose.Types.ObjectId[];
}

@InputType()
export class SpaceUpdateInput implements Partial<Space> {
  @Field({ nullable: true })
  @Length(1, 255)
  name?: string;

  @Field((_type) => [String], { nullable: true })
  users?: mongoose.Types.ObjectId[];
}
