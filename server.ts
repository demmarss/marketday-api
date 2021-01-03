import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import { buildSchema} from "type-graphql";
import { sequelize } from "./src/sequelize";
import { MdUserResolver } from './src/models/mdUser/mdUserResolver'
import { MdItemResolver } from './src/models/mdItem/mdItemResolver'
import { MdOrderResolver } from './src/models/mdOrder/mdOrderResolver'
import { MdImageSrcResolver } from './src/models/mdImageSrc/mdImageSrcResolver'
import { MdOrderItemResolver } from './src/models/mdOrderItem/mdOrderItemResolver'
import { MdPaymentResolver } from './src/models/mdPayment/mdPaymentResolver'
import { MdShopResolver } from './src/models/mdShop/mdShopResolver'




const main = async () => {
    
    sequelize.sync({ alter: true })
    // sequelize.drop()

    const schema = await buildSchema({
        resolvers: [ 
            MdUserResolver,
            MdItemResolver,
            MdOrderResolver,
            MdImageSrcResolver,
            MdOrderItemResolver,
            MdPaymentResolver,
            MdShopResolver
        ],
      });

    const apolloServer = new ApolloServer({
        schema
    })

    const app = Express();

    apolloServer.applyMiddleware({app})

    app.listen(5000, ()=>{
        console.log("Server started at http://localhost:5000/graphql")
    })
}

main();