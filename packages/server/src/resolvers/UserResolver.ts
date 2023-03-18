import { User } from "../entities/User";
import { SpaceModel, UserModel } from "../entities";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserInput, UserUpdateInput } from "./inputTypes/UserInput";
import { getHashedPassword } from "../utils";
import { ContextType } from "../types";
import { mongoose } from "@typegoose/typegoose";
import { Space } from "src/entities/Space";
import { Types } from "mongoose";

const populatePaths = "spaces";

@Resolver()
export class UserResolver {
  /* TODO restrict to ADMIN
  @Query(() => [User])
  // eslint-disable-next-line
  async returnAllUsers(@Ctx() { user }: { user: DecodedJwtToken }) {
    if (!user) {
      throw new Error("Access denied.");
    }
    return await UserModel.find().populate(populatePaths);
  }
  */

  @Mutation(() => User)
  async createUser(
    @Arg("data") { first_name, last_name, password, email }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<User> {
    const userExists = await UserModel.findOne({ email: email }, "email");
    if (userExists) {
      throw new Error("A user with these details exists.");
    }
    const password_hash = await getHashedPassword(password);
    const user: User & mongoose.Document = await UserModel.create({
      first_name,
      last_name,
      password_hash,
      email,
    });
    // If there no space defined context (i.e. an existing user is not adding a new user), create a new default space for the new user
    if (!ctx || !ctx.space) {
      const newSpace: Space & mongoose.Document = await SpaceModel.create({
        name: "My Budget",
        users: [user.id],
      });
      const typedNewSpaceId: Types.ObjectId | undefined =
        typeof newSpace.id === "string"
          ? new Types.ObjectId(newSpace.id)
          : undefined;
      user.spaces = user.spaces.concat(typedNewSpaceId);
    } else {
      user.spaces = user.spaces.concat(new mongoose.Types.ObjectId(ctx.space));
    }
    await user.save();
    return user.populate(populatePaths);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data") userUpdate: UserUpdateInput
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...userUpdate },
      { new: true }
    );
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
