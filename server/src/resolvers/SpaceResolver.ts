import { SpaceModel, UserModel } from "../entities";
import { Space } from "../entities/Space";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { SpaceInput, UpdateSpaceInput } from "./inputTypes/SpaceInput";
import { mongoose } from "@typegoose/typegoose";

const populatePaths = "users";

@Resolver((_of) => Space)
export class SpaceResolver {
  @Query((_returns) => Space)
  async returnSingleSpace(@Arg("id") id: string): Promise<Space> {
    return await SpaceModel.findById({ _id: id }).populate(populatePaths);
  }

  @Query(() => [Space])
  async returnAllSpaces(): Promise<Space[]> {
    return await SpaceModel.find().populate(populatePaths);
  }

  @Mutation(() => Space)
  async createSpace(@Arg("data") { name, users }: SpaceInput): Promise<Space> {
    const space = await SpaceModel.create({
      name,
      users,
    });
    await space.save();
    return space.populate(populatePaths);
  }

  @Mutation(() => Space)
  async updateSpace(
    @Arg("id") id: string,
    @Arg("data") spaceUpdate: UpdateSpaceInput
  ): Promise<Space> {
    const space = await SpaceModel.findByIdAndUpdate(
      id,
      {
        ...spaceUpdate,
      },
      { new: true }
    );
    if (!space) {
      throw new Error("Invalid space id");
    }
    return space.populate(populatePaths);
  }

  @Mutation(() => Space)
  async addUserToSpace(@Arg("id") id: string, @Arg("userId") userId: string): Promise<Space> {
    const space = await SpaceModel.findById({ _id: id });
    if (!space) {
      throw new Error("Invalid space id");
    }
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      throw new Error("Invalid user id");
    }

    // Add user id to space, if it doesn't exist there already
    if (user._id instanceof mongoose.Types.ObjectId && !space.users?.includes(user._id)) {
      space.users = space.users?.concat(user._id);
      await space.save();
    }

    // Add space id to user, if it doesn't exist there already
    if (space._id instanceof mongoose.Types.ObjectId && !user.spaces?.includes(space._id)) {
      user.spaces = user.spaces?.concat(space._id);
      await user.save();
    }

    return space.populate(populatePaths);
  }

  @Mutation(() => Space)
  async deleteUserFromSpace(@Arg("id") id: string, @Arg("userId") userId: string): Promise<Space> {
    const space = await SpaceModel.findById({ _id: id });
    if (!space) {
      throw new Error("Invalid space id");
    }
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      throw new Error("Invalid user id");
    }

    if (user._id instanceof mongoose.Types.ObjectId && space.users?.includes(user._id)) {
      space.users = space.users.filter((id) => id?.toString() !== user.id);
      await space.save();
      user.spaces = user.spaces.filter((id) => id?.toString() !== space.id);
      await user.save();
    }
    return space.populate(populatePaths);
  }

  @Mutation(() => Boolean)
  async deleteSpace(@Arg("id") id: string): Promise<boolean> {
    await SpaceModel.deleteOne({ _id: id });
    return true;
  }
}
