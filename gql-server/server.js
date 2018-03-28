const
    express = require('express'),
    app = express(),
    express_graphql = require('express-graphql'),
    { buildSchema } = require('graphql'),
    port = process.env.PORT || 3223;

let schema = buildSchema(`
    type Query {
        message: String
    }
`);

let root = {
    message: () => 'Hello World',
};

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, console.log(`Listening on port ${port}`));

