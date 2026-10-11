
import { Router } from "express";
import {
    createProfile,
    deleteProfile,
    getProfileByUserId,
    updateProfile,
} from "./profiles.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import {
    createProfileSchema,
    updateProfileSchema,
} from "./profiles.validator.js";

const router = Router();

router.post(
    "/",
    validateBody(createProfileSchema),
    createProfile,
);

router.get(
    "/user/:userId",
    getProfileByUserId,
);

router.patch(
    "/:id",
    validateBody(updateProfileSchema),
    updateProfile,
);

router.delete("/:id", deleteProfile);

export default router;
