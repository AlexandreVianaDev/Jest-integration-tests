import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersMock from "./users.mock";

export default {
  genToken: (email: string) => {
    return jwt.sign({ email: email }, String(process.env.SECRET_KEY), {
      expiresIn: "1d",
    });
  },
};
