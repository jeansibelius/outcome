import { SpaceModel, UserModel } from "../entities";
import { Space } from "../entities/Space";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { SpaceInput, SpaceUpdateInput } from "./inputTypes/SpaceInput";
import { Types } from "mongoose";

const populatePaths = "users";

@Resolver()
export class SpaceResolver {
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
    @Arg("data") spaceUpdate: SpaceUpdateInput
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
  async addUserToSpace(
    @Arg("id") spaceId: string,
    @Arg("userId") userId: string
  ): Promise<Space> {
    const space = await SpaceModel.findById({ _id: spaceId });
    if (!space) {
      throw new Error("Invalid space id");
    }
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      throw new Error("Invalid user id");
    }

    let typedUserId = undefined;
    let typedSpaceId = undefined;
    if (typeof user.id === "string") typedUserId = new Types.ObjectId(user.id);
    if (typeof space.id === "string")
      typedSpaceId = new Types.ObjectId(space.id);

    // Add user id to space, if it doesn't exist there already
    if (space.users && !space.users.includes(typedUserId)) {
      space.users = space.users.concat(typedUserId);
      await space.save();
    }

    // Add space id to user, if it doesn't exist there already
    if (user.spaces && !user.spaces.includes(typedSpaceId)) {
      user.spaces = user.spaces.concat(typedSpaceId);
      await user.save();
    }

    return space.populate(populatePaths);
  }

  @Mutation(() => Space)
  async deleteUserFromSpace(
    @Arg("id") id: string,
    @Arg("userId") userId: string
  ): Promise<Space> {
    const space = await SpaceModel.findById({ _id: id });
    if (!space) {
      throw new Error("Invalid space id");
    }
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      throw new Error("Invalid user id");
    }

    let typedUserId = undefined;
    let typedSpaceId = undefined;
    if (typeof user.id === "string") typedUserId = new Types.ObjectId(user.id);
    if (typeof space.id === "string")
      typedSpaceId = new Types.ObjectId(space.id);

    if (space.users && space.users.includes(typedUserId)) {
      space.users = space.users.filter((id) => id?.toString() !== user.id);
      await space.save();
    }
    if (user.spaces && user.spaces.includes(typedSpaceId)) {
      user.spaces = user.spaces.filter((id) => id?.toString() !== space.id);
      await user.save();
    }
    return space.populate(populatePaths);
  }

  @Mutation(() => Boolean)
  async deleteSpace(@Arg("id") id: string): Promise<number> {
    // TODO: Find all entries and categories associated with given space and delete them first
    // For associated users, delete only if each user has more than given space associated with them. Else return error. Other option: make the spaces in a user optional and allow a null state (user could create a space in the UI)
    const result = await SpaceModel.deleteOne({ _id: id });
    return result.deletedCount;
  }
}
