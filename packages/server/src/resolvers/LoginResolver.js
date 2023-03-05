"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthResponse_1 = require("../entities/AuthResponse");
const entities_1 = require("../entities");
const type_graphql_1 = require("type-graphql");
let LoginResolver = class LoginResolver {
    async login(email, password) {
        const user = await entities_1.UserModel.findOne({ email }).populate("spaces");
        const passwordCorrect = 
        // Compare even, if user is null to avoid time based user sniffing
        user === null
            ? await bcrypt_1.default.compare(password, self.crypto.randomUUID())
            : await bcrypt_1.default.compare(password, user.password_hash);
        if (!(user && passwordCorrect)) {
            throw new Error("Wrong email or password.");
        }
        const userForToken = {
            id: user.id,
        };
        const SECRET = process.env.JWT_SECRET;
        if (!SECRET)
            throw new Error("Secret missing");
        const token = jsonwebtoken_1.default.sign(userForToken, SECRET, { expiresIn: "24h" });
        return {
            token,
            user,
        };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => AuthResponse_1.AuthResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password"))
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LoginResolver);
exports.LoginResolver = LoginResolver;
