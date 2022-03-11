import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthResponse } from "../entities/AuthResponse";
import { User } from "../entities/User";
import { UserModel } from "../entities";
import { Arg, Mutation, Resolver } from "type-graphql";
import { randomUUID } from "crypto";

@Resolver()
export class LoginResolver {
  @Mutation(() => AuthResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthResponse> {
    const user: User | null = await UserModel.findOne({ email }).populate("spaces");

    const passwordCorrect =
      // Compare even, if user is null to avoid time based user sniffing
      user === null
        ? await bcrypt.compare(password, randomUUID())
        : await bcrypt.compare(password, user.password_hash);

    if (!(user && passwordCorrect)) {
      throw new Error("Wrong email or password.");
    }

    const userForToken = {
      id: user.id,
    };

    const SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(userForToken, SECRET!, { expiresIn: "24h" });

    return {
      token,
      user,
    };
  }
}
