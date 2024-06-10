import { Application } from "express";
import userRouter from "../../presentation/routes/userRouter";
import adminRouter from "../../presentation/routes/adminRouter";
import sellerRouter from "../../presentation/routes/sellerRouter";

const routes = (app: Application) => {

  app.use("/api/",userRouter);
  app.use("/admin/",adminRouter);
  app.use("/restaurant/" , sellerRouter);

};

export default routes;
