import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import Express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { auth } from './auth';
import { RoomResolver } from './resolvers/room/RoomResolver';
import { SchoolResolver } from './resolvers/school/SchoolResolver';
import { StudentResolver } from './resolvers/student/studentResolver';
import { UserResolver } from './resolvers/user';
import { ParentResolver } from './resolvers/parent/parentResolver';



const init = async () => {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [UserResolver, SchoolResolver, RoomResolver, StudentResolver, ParentResolver],
        authChecker: auth
    })
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    })
    const app = Express();
    const RedisStore = connectRedis(session);
    app.use(cors({ credentials: true }))
    app.use(session({
        store: new RedisStore({
            client: new Redis()
        }),
        name: 'knowId',
        secret: "thisismysecreatkeyfornow2021",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
        }
    }))

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('sever stared on 4000'))
}

init();