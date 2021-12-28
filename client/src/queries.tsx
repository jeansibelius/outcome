import { gql } from "@apollo/client";

export const ALL_ENTRIES = gql`
  query ReturnAllEntries {
    returnAllEntries {
      type
      name
      id
      description
      date
      category {
        name
      }
      amount
    }
  }
`;
