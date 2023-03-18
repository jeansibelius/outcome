import { ulid } from "ulid";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "./dynamo";

export * as User from "./user";

export const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
      service: "outcome",
    },
    attributes: {
      userID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      fullName: {
        type: "string",
        // never set value to the database
        set: () => undefined,
          // calculate full name on retrieval
          get: (_, {firstName, lastName}) => {
          return `${firstName ?? ""} ${lastName ?? ""}`.trim();
        }
      },
      email: {
        type: "string",
        required: true,
      },
      spaces: {
        type: "set",
        items: "string"
      }
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["userID"],
        },
      },
      bySpace: {
        index: "gs1pk-gs1sk-index",
        pk: {
          field: "gsi1pk",
          composite: []
        },
        sk: {
          field: "gsi1sk",
          composite: ["space"]
        }
      },
    },
  },
  Dynamo.Configuration
);

export type UserEntityType = EntityItem<typeof UserEntity>;

interface createInput {
  firstName: string;
  lastName: string;
  email: string;
  spaces: [string];
}

export async function create(createInput: createInput) {
  const result = await UserEntity.create({
    userID: ulid(),
    ...createInput
  }).go();

  return result.data;
}

export async function get(entryID: string) {
  const result = await UserEntity.get({ userID: entryID }).go();
  return result.data;
}

export async function list(space: string) {
  const result = await UserEntity.query.bySpace({ space }).go();
  return result.data;
}
