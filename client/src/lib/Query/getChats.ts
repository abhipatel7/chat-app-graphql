import { gql } from '@apollo/client';

export const getChatsQuery = gql`
  query allChats {
    getChats {
      id
      name
      message
    }
  }
`;
