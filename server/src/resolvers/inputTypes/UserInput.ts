import { Field, InputType } from "type-graphql";
import { User } from "../../entities/User";
import { IsEmail, Length, MaxLength } from "class-validator";

@InputType()
export class UserInput implements Omit<User, "id"> {
  @Field()
  @Length(1, 255)
  first_name: string;

  @Field()
  @Length(1, 255)
  last_name: string;

  @Field()
  @IsEmail()
  @MaxLength(255)
  email: string;
}

@InputType()
export class UserUpdateInput implements Partial<User> {
  @Field({ nullable: true })
  @Length(1, 255)
  first_name?: string;

  @Field({ nullable: true })
  @Length(1, 255)
  last_name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
