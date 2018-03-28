const
    express = require('express'),
    app = express(),
    { json } = require('body-parser'),
    graphqlHTTP = require('express-graphql'),
    { 
        buildSchema,
        GraphQLSchema,
        GraphQLNonNull,
        GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLFloat,
        GraphQLList
    } = require('graphql'),
    port = process.env.PORT || 3223;

app.use(json());

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Represents an Employee',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'Represents a Product',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLInt }
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'The main query.',
    fields: () => ({
        employees: {
            type: new GraphQLList(EmployeeType),
            description: 'List of Employees',
            resolve: function() {
                return 'EMPLOYEE'
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            desciption: 'List of Products',
            resolve: function() {
                return 'PRODUCTS'
            }
        }
    })
})

const root = {
    employee: () => {
        return 'Employee'
    }
};

const schema = new GraphQLSchema({
    query: Query
})

app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(port, console.log(`Listening on port ${port}`));