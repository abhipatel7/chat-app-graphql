import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { Chat } from '../entities/chat';
import { v4 } from 'uuid';

const chats: Chat[] = [];
const channel = 'CHAT_CHANNEL';

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(() => Chat)
  async createChat(
    @PubSub() pubSub: PubSubEngine,
    @Arg('name') name: string,
    @Arg('message') message: string
  ): Promise<Chat> {
    const chat = { id: v4(), name, message };

    await pubSub.publish(channel, chat);
    chats.push(chat);

    return chat;
  }

  @Subscription({ topics: 'CHAT_CHANNEL' })
  messageSent(@Root() { id, name, message }: Chat): Chat {
    return { id, name, message };
  }
}
