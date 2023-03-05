"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connectToDB_1 = __importDefault(require("./utils/connectToDB"));
const resolvers_1 = __importDefault(require("./resolvers"));
const path_1 = __importDefault(require("path"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const entities_1 = require("./entities");
const typegoose_1 = require("@typegoose/typegoose");
async function startApolloServer() {
    const corsAllowedOrigins = [
        /localhost/,
        /192\.168\.1\.5:3000/,
        /192\.168\.1\.5:4000/,
        "https://studio.apollographql.com",
    ];
    const corsOptions = {
        origin: corsAllowedOrigins,
    };
    // Required logic for integrating with Express
    const app = (0, express_1.default)();
    const appPath = "/graphql";
    app.use((0, cors_1.default)(corsOptions));
    // Serve static files from client
    app.use(express_1.default.static(path_1.default.join(__dirname, "../../build/client/src")));
    const httpServer = http_1.default.createServer(app);
    // Extract token and add to request, if found
    app.use(middleware_1.tokenExtractor);
    // Extract space id and add to request, if found
    app.use(middleware_1.spaceExtractor);
    // Connect to DB
    await (0, connectToDB_1.default)();
    const schema = await (0, resolvers_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: async ({ req, }) => {
            // Exclude login from auth
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            if (req.body.query.match("Login"))
                return null;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            if (req.body.query.match("CreateUser"))
                return null;
            const token = req.token;
            const space = req.space;
            if (!token) {
                throw new Error("Token missing from request.");
            }
            if (!space) {
                throw new Error("User space missing from request.");
            }
            // try to retrieve a user with the token
            const user = (0, utils_1.decodeToken)(token);
            // we could also check user roles/permissions here
            if (!user)
                throw new apollo_server_core_1.AuthenticationError("You must be logged in");
            // Check that user belongs to given space
            const spaceFromDB = await entities_1.SpaceModel.findById({
                _id: space,
            });
            if (!spaceFromDB) {
                throw new apollo_server_core_1.AuthenticationError("Given space doesn't exist in the DB.");
            }
            if (!spaceFromDB.users?.includes(new typegoose_1.mongoose.Types.ObjectId(user.id))) {
                throw new apollo_server_core_1.AuthenticationError("User doesn't belong to the given space.");
            }
            // add the user & active space to the context
            return { user, space };
        },
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: appPath,
        cors: false,
    });
    const PORT = process.env.PORT || 4000;
    // Modified server startup
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer().catch((error) => console.log(`Error: ${error}`));
