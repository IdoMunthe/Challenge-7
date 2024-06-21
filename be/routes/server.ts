import "dotenv/config";
import "../config/filealias";
import "@Config/database";
import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { authorize, checkRole } from "@Middlewares/authorization"
import { routeNotFound } from "@Middlewares/routeNotFound";
import carsRouter from "@Routes/Cars/CarsRoute";
import usersRouter from "@Routes/Users/UsersRoute"
import authRouter from "@Routes/Auth/AuthRoute";

const app: Express = express();
const port: number = Number(process.env.APP_PORT) || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(YAML.load("api-ch6-synrgy-idomunthe-docs.yaml"))
); // Dokumentasi API 

app.use("/api/cars", carsRouter); //Cars Router
app.use("/api/users", [authorize, checkRole(["SUPERADMIN"])], usersRouter); //Users Router
app.use("/api", authRouter); //Auth Router
app.use(routeNotFound); // Custom Route Not Found

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
