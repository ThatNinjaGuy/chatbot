import express from "express";
import cors from "cors";
import { config } from "./config.js";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: config.clientOrigin }));

app.use(routes);

app.listen(config.serverPort, () => {
  console.log(`Server running on port ${config.serverPort}`);
});
