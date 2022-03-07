import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { getChatsQuery } from '../lib/Query/getChats';
import { chatsSubscription } from '../lib/Subscription/chatsSubscription';

const Chats = () => {
  const { loading, error, data, subscribeToMore } = useQuery(getChatsQuery);

  useEffect(() => {
    subscribeToMore({
      document: chatsSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.messageSent;
        console.log({ newChat });
        return {
          getChats: [...prev.getChats, newChat],
        };
      },
    });
  }, []);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      {data.getChats.map((chat: any) => (
        <div key={chat.id}>
          <p>
            {chat.name}: {chat.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Chats;
