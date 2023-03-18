import { prop as Property, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Space {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Field((_type) => [User], { nullable: true })
  @Property({ ref: () => User, nullable: true })
  users?: Ref<User>[];
}
