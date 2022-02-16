import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, Ref } from "@typegoose/typegoose";
import { Space } from "./Space";

@ObjectType()
export class PublicUser {
  @Field()
  @Property({ required: true })
  first_name: string;

  @Field()
  @Property({ required: true })
  last_name: string;

  @Field((_type) => [Space])
  @Property({ ref: () => Space, required: true })
  spaces: Ref<Space>[];
}

@ObjectType()
export class User extends PublicUser {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  email: string;

  @Property({ required: true })
  password_hash: string;
}
