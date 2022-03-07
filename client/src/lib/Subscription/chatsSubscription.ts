import { gql } from '@apollo/client';

export const chatsSubscription = gql`
  subscription OnNewChat {
    messageSent {
      id
      name
      message
    }
  }
`;
