import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Chat } from '../entities/chat';
import { v4 } from 'uuid';

const chats: Chat[] = [];

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(() => Chat)
  createChat(@Arg('name') name: string, @Arg('message') message: string): Chat {
    const chat = { id: v4(), name, message };

    chats.push(chat);

    return chat;
  }
}
