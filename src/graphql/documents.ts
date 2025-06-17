/**
 * This is the file in which we will define all GraphQL documents to send to the main API
 */

import { gql } from "@apollo/client";

/** Get some TODOS */
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      user {
        id
        name
      }
    }
  }
`;

/** Create a new TODO */
export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!, $name: String!) {
    createTodo(input: { text: $text, name: $name }) {
      text
      id      
    }
  }
`;

/** Get Groups */
export const GET_GROUPS = gql `
  query fetchGroups {
    groups {
      id
      name
      description
      profilePic {
        data
        mimeType
      }
      isVerified
      isOpen
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($input: NewGroup!) {
    createGroup(input: $input) {
      id
      name
      description
      isVerified
      isOpen
      createdAt
      updatedAt
    }
  }
`;