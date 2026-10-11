
import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();

    const server = app.listen(env.PORT, () => {
      console.log(`Server running at http://localhost:${env.PORT}`);
    });

    const shutdown = () => {
      server.close(() => {
        void prisma
          .$disconnect()
          .then(() => {
            console.log("Database disconnected");
          })
          .catch((error: unknown) => {
            console.error("Error disconnecting database:", error);
            process.exitCode = 1;
          });
      });
    };

    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start the application:", error);
    await prisma.$disconnect();
    process.exitCode = 1;
  }
}

void startServer();
