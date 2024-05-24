import { Application } from "express";
import userRouter from "../../presentation/routes/userRouter";
import adminRouter from "../../presentation/routes/adminRouter";

const routes = (app: Application) => {

  app.use("/api/",userRouter);
  app.use("/admin/",adminRouter);

  // app.use("/api/seller");
  // app.use("/api/admin");
};

export default routes;
