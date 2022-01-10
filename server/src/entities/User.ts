import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  first_name: string;

  @Field()
  @Property({ required: true })
  last_name: string;

  @Property({ required: true })
  password_hash: string;

  @Field()
  @Property({ required: true })
  email: string;
}

export const UserModel = getModelForClass(User);
