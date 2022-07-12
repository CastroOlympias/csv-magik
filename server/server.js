const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const {typeDefs, resolvers} = require('./connections')
const { authMiddleware } = require('./configuration/Authentication');
const db = require('./configuration/Database');
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
      });
      await server.start();
      const app = express();
      server.applyMiddleware({ app });
      
      app.use(express.urlencoded({ extended: false }));
      app.use(express.json());
 
      if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
      }

  
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
      })

      db.once('open', () => {
        app.listen(PORT, () => {
          console.log(`🌍 API server running on port ${PORT}!`);
          console.log(`🌍 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
      });
}
startApolloServer();