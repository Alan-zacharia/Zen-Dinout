import jwt from "jsonwebtoken";
import configuredKeys from "../configs/config";

/** JWT TOKEN GENERATION */
export const jwtGenerateToken = (userID: string): string => {
  const payload = {
    userID: userID,
  };
  return jwt.sign(payload, configuredKeys.JWT_SECRET_KEY, { expiresIn: "1h" });
};

/** JWT REFRESH TOKEN */
export const jwtGenerateRefreshToken = (userId: string): string => {
  const payload = {
    userId: userId,
  };
  return jwt.sign(payload, configuredKeys.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "2h",
  });
};

/** JWT VERIFY TOKEN */
export const jwtVerifyToken = (accessToken: string) => {
  jwt.verify(
    accessToken,
    configuredKeys.JWT_REFRESH_SECRET_KEY,
    (err: any, decode: any) => {
      if (err) {
        return { message: "Invalid Token", decode: null };
      } else {
        return { message: "Verified successfull", decode };
      }
    }
  );
};
