import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';
import PostsSearch from './PostsSearch';

const client = new ApolloClient({
  // Change this to the URL of your WordPress site.
  uri: "https://www.wpgraphql.com/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <h2 className="title">
        My first WPGraphQL & Apollo app {' '}
        <span className="emoji" role="img" aria-label="rocket">🚀</span>
      </h2>
      <PostsSearch />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
