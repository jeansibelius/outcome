import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, Ref } from "@typegoose/typegoose";
import { Space } from "./Space";

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

  @Field((_type) => [Space])
  // TODO: try refactoring the hardcoded ref below to () => Space, if possible (seems to be a typegoose runtime problem https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes#common-problems)
  @Property({ ref: () => Space, required: true })
  spaces: Ref<Space>[];
}
