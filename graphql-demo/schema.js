const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql');

const UserInfoType = new GraphQLSchema({
    name: 'UserInfo',
    description: '...',
    // fields: () => ({
    //     "login": { type: GraphQLString },
    //     "id": { type: GraphQLInt },
    //     "avatar_url": { type: GraphQLString },
    //     "site-admin": { type: GraphQLBoolean },
    // })
})

const query = new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
        gitHubUser: {
            type: UserInfoType,
            description: '...',
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: '...'
                }
            },
            resolve: (_,{username}) => {
                const url = `https://api.github.com/users/${username}`;
                return axios.get(url)
                            .then(function(response) {
                                return response.data;
                            })
            }
        }
    })
})

const schema = new GraphQLSchema({
    query,
})

module.exports = schema;