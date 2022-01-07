import { Entry, EntryModel } from "../entities/Entry";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EntryInput, EntryUpdateInput } from "./inputTypes/EntryInput";

@Resolver((_of) => Entry)
export class EntryResolver {
  @Query((_returns) => Entry, { nullable: false })
  async returnSingleEntry(@Arg("id") id: string) {
    return await EntryModel.findById({ _id: id }).populate("category");
  }

  @Query(() => [Entry])
  async returnAllEntries() {
    return await EntryModel.find().populate("category");
  }

  @Mutation(() => Entry)
  async createEntry(
    @Arg("data") { type, date, name, amount, category, description }: EntryInput
  ): Promise<Entry> {
    const entry = await EntryModel.create({
      type,
      date,
      name,
      amount,
      category,
      description,
    });
    await entry.save();
    return entry.populate("category");
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
    return entry.populate("category");
  }

  @Mutation(() => Boolean)
  async deleteEntry(@Arg("id") id: string) {
    await EntryModel.deleteOne({ _id: id });
    return true;
  }
}
