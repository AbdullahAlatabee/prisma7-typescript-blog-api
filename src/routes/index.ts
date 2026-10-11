
// import { Router } from "express";
// import { prisma } from "../config/database.js";

// const router = Router();

// router.get("/health", (_req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "API is running",
//   });
// });

// router.get("/health/database", async (_req, res) => {
//   await prisma.$queryRaw`SELECT 1`;

//   res.status(200).json({
//     success: true,
//     message: "Database connection is healthy",
//   });
// });

// export default router;


import { Router } from "express";
import { prisma } from "../config/database.js";
import usersRouter from "../modules/users/users.routes.js";
import profilesRouter from "../modules/profiles/profiles.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

router.get("/health/database", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;

  res.status(200).json({
    success: true,
    message: "Database connection is healthy",
  });
});

router.use("/users", usersRouter);
router.use("/profiles", profilesRouter);

export default router;
