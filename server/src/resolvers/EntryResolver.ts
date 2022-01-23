import { Entry } from "../entities/Entry";
import { EntryModel } from "../entities";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EntryInput, EntryUpdateInput } from "./inputTypes/EntryInput";
import { ContextType } from "../types";

const populatePaths = ["category", "user"];

@Resolver((_of) => Entry)
export class EntryResolver {
  @Query((_returns) => Entry, { nullable: false })
  async returnSingleEntry(@Arg("id") id: string): Promise<Entry> {
    return await EntryModel.findById({ _id: id }).populate(populatePaths);
  }

  @Query(() => [Entry])
  async returnAllEntries(): Promise<Entry[]> {
    return await EntryModel.find().populate(populatePaths);
  }

  @Mutation(() => Entry)
  async createEntry(
    @Arg("data") { type, date, name, amount, category, description }: EntryInput,
    @Ctx() ctx: ContextType
  ): Promise<Entry> {
    const user = ctx.user.id;
    const entry = await EntryModel.create({
      type,
      date,
      name,
      amount,
      category,
      description,
      user,
    });
    await entry.save();
    return entry.populate(populatePaths);
  }

  @Mutation(() => Entry)
  async updateEntry(
    @Arg("id") id: string,
    @Arg("data") entryUpdate: EntryUpdateInput
  ): Promise<Entry> {
    const entry = await EntryModel.findByIdAndUpdate(
      id,
      {
        ...entryUpdate,
      },
      { new: true }
    );
    if (!entry) {
      throw new Error("Invalid entry id");
    }
    return entry.populate(populatePaths);
  }

  @Mutation(() => Boolean)
  async deleteEntry(@Arg("id") id: string): Promise<boolean> {
    await EntryModel.deleteOne({ _id: id });
    return true;
  }
}
