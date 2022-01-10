import { User, UserModel } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserInput, UserUpdateInput } from "./inputTypes/UserInput";

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User)
  async returnSingleUser(@Arg("id") id: string) {
    return await UserModel.findById({ _id: id });
  }

  @Query(() => [User])
  async returnAllUsers() {
    return await UserModel.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") { first_name, last_name, email }: UserInput): Promise<User> {
    const user = await UserModel.create({
      first_name,
      last_name,
      email,
    });
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") userUpdate: UserUpdateInput): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(id, { ...userUpdate }, { new: true });
    if (!user) {
      throw new Error("Invalid user id");
    }
    return user;
  }

  @Mutation(() => Number)
  async deleteUser(@Arg("id") id: string): Promise<number> {
    const { deletedCount } = await UserModel.deleteOne({ _id: id });
    return deletedCount;
  }
}
