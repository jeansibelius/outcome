import { Field, InputType } from "type-graphql";
import { User } from "../../entities/User";
import { IsEmail, IsString, Length, MaxLength } from "class-validator";

@InputType()
export class UserInput implements Omit<User, "id" | "password_hash" | "spaces"> {
  @Field()
  @Length(1, 255)
  @IsString()
  first_name: string;

  @Field()
  @Length(1, 255)
  @IsString()
  last_name: string;

  @Field()
  @Length(4, 255)
  @IsString()
  password: string;

  @Field()
  @IsEmail()
  @MaxLength(255)
  email: string;
}

@InputType()
export class UserUpdateInput implements Partial<User> {
  @Field({ nullable: true })
  @Length(1, 255)
  @IsString()
  first_name?: string;

  @Field({ nullable: true })
  @Length(1, 255)
  @IsString()
  last_name?: string;

  @Field({ nullable: true })
  @Length(4, 255)
  @IsString()
  password?: string;

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
