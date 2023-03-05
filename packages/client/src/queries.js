"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_CATEGORY = exports.deleteCategory = exports.UPDATE_CATEGORY = exports.updateCategory = exports.CREATE_CATEGORY = exports.createCategory = exports.ALL_CATEGORIES = exports.returnAllCategories = exports.DELETE_ENTRY = exports.deleteEntry = exports.UPDATE_ENTRY = exports.updateEntry = exports.CREATE_ENTRY = exports.createEntry = exports.ALL_ENTRIES = exports.returnAllEntries = exports.LOGIN = exports.login = exports.createSpace = exports.spaceDetails = exports.GET_CURRENT_VIEW_RANGE = exports.GET_ACTIVE_SPACE = exports.GET_ME = exports.IS_LOGGED_IN = void 0;
const client_1 = require("@apollo/client");
// Query for checking logged in status from local cache (won't call the server)
exports.IS_LOGGED_IN = (0, client_1.gql) `
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
exports.GET_ME = (0, client_1.gql) `
  query Me {
    me @client
  }
`;
exports.GET_ACTIVE_SPACE = (0, client_1.gql) `
  query ActiveSpace {
    activeSpace @client
  }
`;
exports.GET_CURRENT_VIEW_RANGE = (0, client_1.gql) `
  query CurrentViewMonth {
    currentViewMonth @client
  }
`;
// Server calls from here
exports.spaceDetails = `
fragment spaceDetails on Space {
  id
  name
  users {
    id
    first_name
  }
}`;
exports.createSpace = `
mutation CreateSpace($data: SpaceInput!) {
  createSpace(data: $data) {
    ...spaceDetails
  }
}
${exports.spaceDetails}
`;
exports.login = `
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
exports.LOGIN = (0, client_1.gql) `
  ${exports.login}
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
exports.returnAllEntries = `
  query ReturnAllEntries {
    returnAllEntries {
      ...EntryDetails
    }
  }
  ${entryDetails}
`;
exports.ALL_ENTRIES = (0, client_1.gql) `
  ${exports.returnAllEntries}
`;
exports.createEntry = `
  mutation CreateEntry($entryData: EntryInput!) {
    createEntry(data: $entryData) {
      ...EntryDetails
    }
  }
  ${entryDetails}
`;
exports.CREATE_ENTRY = (0, client_1.gql) `
  ${exports.createEntry}
`;
exports.updateEntry = `
  mutation UpdateEntry($id: String!, $data: EntryUpdateInput!) {
    updateEntry(id: $id, data: $data) {
      ...EntryDetails
    }
  }
  ${entryDetails}
`;
exports.UPDATE_ENTRY = (0, client_1.gql) `
  ${exports.updateEntry}
`;
exports.deleteEntry = `
  mutation DeleteEntry($id: String!) {
    deleteEntry(id: $id)
  }
`;
exports.DELETE_ENTRY = (0, client_1.gql) `
  ${exports.deleteEntry}
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
exports.returnAllCategories = `
query ReturnAllCategories {
  returnAllCategories {
    ...CategoryDetails
  }
}
${categoryDetails}
`;
exports.ALL_CATEGORIES = (0, client_1.gql) `
  ${exports.returnAllCategories}
`;
exports.createCategory = `
mutation CreateCategory($categoryData: CategoryInput!) {
  createCategory(data: $categoryData) {
    ...CategoryDetails
  }
}
${categoryDetails}
`;
exports.CREATE_CATEGORY = (0, client_1.gql) `
  ${exports.createCategory}
`;
exports.updateCategory = `
mutation UpdateCategory($id: String!, $data: CategoryUpdateInput!) {
  updateCategory(id: $id, data: $data) {
    ...CategoryDetails
  }
}
${categoryDetails}
`;
exports.UPDATE_CATEGORY = (0, client_1.gql) `
  ${exports.updateCategory}
`;
exports.deleteCategory = `
mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
`;
exports.DELETE_CATEGORY = (0, client_1.gql) `
  ${exports.deleteCategory}
`;
