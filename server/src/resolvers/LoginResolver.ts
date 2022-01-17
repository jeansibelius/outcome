import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthResponse } from "../entities/AuthResponse";
import { UserModel } from "../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LoginResolver {
  @Mutation(() => AuthResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password_hash);

    if (!(user && passwordCorrect)) {
      throw new Error("Wrong email or password.");
    }

    const userForToken = {
      id: user.id,
    };

    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
      throw new Error("JWT secret missing.");
    }

    const token = jwt.sign(userForToken, SECRET, { expiresIn: "24h" });

    return { token };
  }
}
