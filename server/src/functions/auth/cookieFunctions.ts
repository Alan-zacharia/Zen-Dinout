import { Response } from "express";

export function setAuthTokenCookie(res: Response, token_name : string ,  token: string) {
  res.cookie(token_name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 86400000,
  });
}
