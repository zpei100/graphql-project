const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('app is up on port 4000')
})