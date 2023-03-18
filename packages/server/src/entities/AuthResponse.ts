import { Field, ObjectType } from "type-graphql";
import { PublicUser } from "./User";

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field((_type) => PublicUser)
  user: PublicUser;
}
