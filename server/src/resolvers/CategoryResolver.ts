import { Category } from "../entities/Category";
import { CategoryModel, EntryModel } from "../entities";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CategoryInput, CategoryUpdateInput } from "./inputTypes/CategoryInput";
import { ContextType } from "../types";

@Resolver((_of) => Category)
export class CategoriesResolver {
  @Query((_returns) => Category, { nullable: false })
  async returnSingleCategory(@Arg("id") id: string, @Ctx() { space }: ContextType) {
    return await CategoryModel.findById({ _id: id, space });
  }

  @Query(() => [Category])
  async returnAllCategories(@Ctx() { space }: ContextType) {
    return await CategoryModel.find({ space });
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data") { type, name, monthlyBudget, description, icon }: CategoryInput,
    @Ctx() { space }: ContextType
  ): Promise<Category> {
    const category = (
      await CategoryModel.create({
        type,
        name,
        monthlyBudget,
        description,
        icon,
        space,
      })
    ).save();
    return category;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("data") categoryData: CategoryUpdateInput
  ): Promise<Category> {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        ...categoryData,
      },
      { new: true }
    );
    if (!category) {
      throw new Error("Invalid category id");
    }
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: string, @Ctx() ctx: ContextType) {
    // De-associate all related entries from the category to be deleted
    await EntryModel.updateMany({ category: id }, { category: null });
    await CategoryModel.deleteOne({ _id: id, space: ctx.space });
    return true;
  }
}
