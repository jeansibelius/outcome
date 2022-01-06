import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import NewCategoryForm from "./NewCategoryForm";
import { Category, CategoryInput, NewCategory } from "../types";
import { useMutation } from "@apollo/client";
import { ALL_CATEGORIES, CREATE_CATEGORY } from "../queries";
import { toNewCategory } from "../utils";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ modalOpen, onClose }: Props) => {
  const [error, setError] = React.useState<string | undefined>();
  const [createCategory] = useMutation<{ CreateCategory: Category }, { categoryData: NewCategory }>(
    CREATE_CATEGORY,
    {
      refetchQueries: [{ query: ALL_CATEGORIES }],
      onError: (error) => {
        throw new Error(error.message);
      },
    }
  );

  const submitNewCategory = async (values: CategoryInput) => {
    try {
      const newCategory = toNewCategory(values);
      await createCategory({
        variables: { categoryData: newCategory },
      });
      onClose();
      setError(undefined);
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
        setError(error.message);
      }
      console.log("error", error);
    }
  };
  return (
    <Modal className="p-2" open={modalOpen} onClose={onClose} centered={true} closeIcon>
      <Modal.Header>Add a new category</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <NewCategoryForm onSubmit={submitNewCategory} />
      </Modal.Content>
    </Modal>
  );
};

export default AddCategoryModal;
