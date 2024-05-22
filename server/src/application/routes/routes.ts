import { Application } from "express";
import userRouter from "../../presentation/routes/userRouter";

const routes = (app: Application) => {

  app.use("/api/",userRouter);
  // app.use("/api/seller");
  // app.use("/api/admin");
};

export default routes;
