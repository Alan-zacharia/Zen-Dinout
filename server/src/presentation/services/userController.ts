import { Response, Request, NextFunction } from "express";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { UserType } from "../../domain/entities/User";

export class userController {
  constructor(private readonly interactor: IUserInteractor) {}

  /**
   * Registeration service
   * @param credentials - Object containing username,email, password, role for registeration
   * @returns Object containing user data, message, token, and refreshToken
   */
  async Register(req: Request, res: Response, next: NextFunction) {
    console.log("Register service......");
    try {
      const { email, username, password, role } = req.body;
      let credentials: UserType = { email, username, password, role };
      console.log("Registeration Credentials", credentials);
      const { user, message } = await this.interactor.register(
        credentials
      );

      if (!user) {
        return res.status(401).json({ message });
      }
      return res.status(200).json({ message });

    } catch (error) {
      if (error instanceof Error) {
        console.error("Oops ! error during register:", error.message);
      }
      res.status(500).send("Internal server error");
    }
  }

  /**
   * Login verification service
   * @param credentials - Object containing email and password for login
   * @returns Object containing user data, message, token, and refreshToken
   */
  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;
      const { user, token, message, refreshToken } = await this.interactor.login({ email, password, role });
      if (!user) {
        return res.status(401).json({ message, token: null });
      }
      return res.status(200).json({ message, user, token, refreshToken });
    } catch (error) {
      console.error(" OOps ! error during register:", error);
      res.status(500).send("Internal server error");
    }
  }
}
