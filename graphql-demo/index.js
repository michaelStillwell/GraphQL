const
    express =  require('express'),
    GraphHTTP =  require('express-graphql'),
    schema =  require('./schema');

const app = express();
const port = 4001;

app.use('/graphql', GraphHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => console.log('Listening ...'));