import { User } from "../entities/User";
import { SpaceModel, UserModel } from "../entities";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserInput, UserUpdateInput } from "./inputTypes/UserInput";
import { getHashedPassword } from "../utils";
import { ContextType, DecodedJwtToken } from "../types";
import { mongoose } from "@typegoose/typegoose";

const populatePaths = "spaces";

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User)
  async returnSingleUser(@Arg("id") id: string) {
    return await UserModel.findById({ _id: id }).populate(populatePaths);
  }

  @Query(() => [User])
  // eslint-disable-next-line
  async returnAllUsers(@Ctx() { user }: { user: DecodedJwtToken }) {
    // TODO restrict to ADMIN?
    if (!user) {
      throw new Error("Access denied.");
    }
    return await UserModel.find().populate(populatePaths);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") { first_name, last_name, password, email }: UserInput,
    @Ctx() { space }: ContextType
  ): Promise<User> {
    const userExists = await UserModel.findOne({ email: email }, "email");
    if (userExists) {
      throw new Error("A user with these details exists.");
    }
    const password_hash = await getHashedPassword(password);
    const user = await UserModel.create({
      first_name,
      last_name,
      password_hash,
      email,
    });
    // If there no space defined context (i.e. an existing user is not adding a new user), create a new default space for the new user
    if (!space) {
      const newSpace = await SpaceModel.create({
        name: "My Budget",
        user: user._id as mongoose.Types.ObjectId,
      });
      user.spaces = user.spaces.concat(new mongoose.Types.ObjectId(newSpace._id as string));
    } else {
      user.spaces = user.spaces.concat(new mongoose.Types.ObjectId(space));
    }
    await user.save();
    return user.populate(populatePaths);
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") userUpdate: UserUpdateInput): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(id, { ...userUpdate }, { new: true });
    if (!user) {
      throw new Error("Invalid user id");
    }
    return user.populate(populatePaths);
  }

  @Mutation(() => Number)
  async deleteUser(@Arg("id") id: string): Promise<number> {
    const { deletedCount } = await UserModel.deleteOne({ _id: id });
    return deletedCount;
  }
}
