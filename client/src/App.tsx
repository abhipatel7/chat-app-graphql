import {
  split,
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { useState } from 'react';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/subscriptions',
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => {
  const [name, setName] = useState('');
  const [entered, setEntered] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {!entered && (
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={() => setEntered(true)}>Enter chat</button>
          </div>
        )}

        {name !== '' && entered && <div>Chats</div>}
      </div>
    </ApolloProvider>
  );
};

export default App;
