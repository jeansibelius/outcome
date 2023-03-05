"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = require("mongoose");
const connectToDB = async () => {
    let MONGODB_URI;
    switch (process.env.NODE_ENV) {
        case "production":
            MONGODB_URI = process.env.MONGODB_URI_PROD;
            break;
        case "development":
            MONGODB_URI = process.env.MONGODB_URI_DEV;
            break;
        default:
            MONGODB_URI = process.env.MONGODB_URI_TEST;
    }
    // create mongoose connection
    if (MONGODB_URI) {
        try {
            const mongoose = await (0, mongoose_1.connect)(MONGODB_URI);
            console.log("Connected to MongoDB", process.env.NODE_ENV);
            if (process.env.NODE_ENV === "development") {
                mongoose.set("debug", true);
            }
            return mongoose.connection;
        }
        catch (error) {
            if (error && error instanceof Error) {
                console.error(`Error connecting to MongoDB: ${error.message}`);
            }
        }
    }
    else {
        console.error("MongoDB URI is undefined");
    }
};
exports.default = connectToDB;
