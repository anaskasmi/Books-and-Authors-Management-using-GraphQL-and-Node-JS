const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const port = 3000
require('dotenv').config()
const { connectToMongoDb } = require('./MongooseConnection')


connectToMongoDb();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(port, () => {
    console.log(`app listening at port : ${port}`)
})