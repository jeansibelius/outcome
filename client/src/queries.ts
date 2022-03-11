import { gql } from "@apollo/client";

// Query for checking logged in status from local cache (won't call the server)
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_ME = gql`
  query Me {
    me @client
  }
`;

export const spaceDetails = `
fragment spaceDetails on Space {
  id
  name
  users {
    id
    first_name
  }
}`;

export const createSpace = `
mutation CreateSpace($data: SpaceInput!) {
  createSpace(data: $data) {
    ...spaceDetails
  }
}
${spaceDetails}
`;

export const GET_ACTIVE_SPACE = gql`
  query ActiveSpace {
    activeSpace @client
  }
`;

export const login = `
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        first_name
        last_name
        spaces {
          id
          name
        }
      }
    }
  }
`;

export const LOGIN = gql`
  ${login}
`;

const entryDetails = `
  fragment EntryDetails on Entry {
    id
    type
    date
    name
    amount
    description
    user {
      first_name
      last_name
    }
    category {
      id
      name
      description
      icon
    }
  }
`;

export const returnAllEntries = `
  query ReturnAllEntries {
    returnAllEntries {
      ...EntryDetails
    }
  }
  ${entryDetails}
`;

export const ALL_ENTRIES = gql`
  ${returnAllEntries}
`;

export const createEntry = `
  mutation CreateEntry($entryData: EntryInput!) {
    createEntry(data: $entryData) {
      ...EntryDetails
    }
  }
  ${entryDetails}
`;

export const CREATE_ENTRY = gql`
  ${createEntry}
`;

export const updateEntry = `
  mutation UpdateEntry($id: String!, $data: EntryUpdateInput!) {
    updateEntry(id: $id, data: $data) {
      ...EntryDetails
    }
  }
  ${entryDetails}
`;

export const UPDATE_ENTRY = gql`
  ${updateEntry}
`;

export const deleteEntry = `
  mutation DeleteEntry($id: String!) {
    deleteEntry(id: $id)
  }
`;

export const DELETE_ENTRY = gql`
  ${deleteEntry}
`;

const categoryDetails = `
fragment CategoryDetails on Category {
  id
  type
  name
  monthlyBudget
  description
  icon
  space {
    id
    name
  }
}
`;

export const returnAllCategories = `
query ReturnAllCategories {
  returnAllCategories {
    ...CategoryDetails
  }
}
${categoryDetails}
`;

export const ALL_CATEGORIES = gql`
  ${returnAllCategories}
`;

export const createCategory = `
mutation CreateCategory($categoryData: CategoryInput!) {
  createCategory(data: $categoryData) {
    ...CategoryDetails
  }
}
${categoryDetails}
`;

export const CREATE_CATEGORY = gql`
  ${createCategory}
`;

export const updateCategory = `
mutation UpdateCategory($id: String!, $data: CategoryUpdateInput!) {
  updateCategory(id: $id, data: $data) {
    ...CategoryDetails
  }
}
${categoryDetails}
`;

export const UPDATE_CATEGORY = gql`
  ${updateCategory}
`;

export const deleteCategory = `
mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
`;

export const DELETE_CATEGORY = gql`
  ${deleteCategory}
`;
