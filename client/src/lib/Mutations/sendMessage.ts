import { gql } from '@apollo/client';

export const sendMessageMutation = gql`
  mutation createChat($name: String!, $message: String!) {
    createChat(name: $name, message: $message) {
      id
      name
      message
    }
  }
`;
