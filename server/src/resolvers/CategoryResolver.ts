import { Category, CategoryModel } from "../entities/Category";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CategoryInput, CategoryUpdateInput } from "./inputTypes/CategoryInput";

@Resolver((_of) => Category)
export class CategoriesResolver {
  @Query((_returns) => Category, { nullable: false })
  async returnSingleCategory(@Arg("id") id: string) {
    return await CategoryModel.findById({ _id: id });
  }

  @Query(() => [Category])
  async returnAllCategories() {
    return await CategoryModel.find();
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data") { type, name, monthlyBudget, description, icon }: CategoryInput
  ): Promise<Category> {
    const category = (
      await CategoryModel.create({
        type,
        name,
        monthlyBudget,
        description,
        icon,
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

  // TODO: need to set category to null from all associated entries
  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: string) {
    await CategoryModel.deleteOne({ _id: id });
    return true;
  }
}
