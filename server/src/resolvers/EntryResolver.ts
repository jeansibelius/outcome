import { Entry, EntryModel } from "../entities/Entry";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EntryInput } from "./inputTypes/EntryInput";

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
    const entry = (
      await EntryModel.create({
        type,
        date,
        name,
        amount,
        category,
        description,
      })
    ).save();
    return entry;
  }

  @Mutation(() => Boolean)
  async deleteEntry(@Arg("id") id: string) {
    await EntryModel.deleteOne({ id });
    return true;
  }
}
