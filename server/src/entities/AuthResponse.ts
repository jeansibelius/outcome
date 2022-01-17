import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;
}
