import { Entry, EntryModel } from "../entities/Entry";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { EntryInput } from "./inputTypes/EntryInput";
import { CategoryModel } from "../entities/Category";

@Resolver((_of) => Entry)
export class EntryResolver implements ResolverInterface<Entry> {
  @Query((_returns) => Entry, { nullable: false })
  async returnSingleEntry(@Arg("id") id: string) {
    return await EntryModel.findById({ _id: id });
  }

  @Query(() => [Entry])
  async returnAllEntries() {
    return await EntryModel.find();
  }

  @FieldResolver()
  async category(@Root() entry: Entry) {
    const category_id = entry._doc.category;
    const category = await CategoryModel.findById(category_id);
    if (!category) throw new Error(`No category found with given id: ${category_id}`);
    return category;
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
