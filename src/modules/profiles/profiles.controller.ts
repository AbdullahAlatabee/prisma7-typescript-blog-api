
import type { RequestHandler } from "express";
import { parseId } from "../../utils/parse-id.js";
import { profilesService } from "./profiles.service.js";
import type {
  CreateProfileInput,
  UpdateProfileInput,
} from "./profiles.validator.js";

export const createProfile: RequestHandler = async (
  req,
  res,
) => {
  const data = req.body as CreateProfileInput;
  const profile = await profilesService.create(data);

  res.status(201).json({
    success: true,
    data: profile,
  });
};

export const getProfileByUserId: RequestHandler = async (
  req,
  res,
) => {
  const userId = parseId(req.params.userId, "User ID");
  const profile = await profilesService.findByUserId(userId);

  res.status(200).json({
    success: true,
    data: profile,
  });
};

export const updateProfile: RequestHandler = async (
  req,
  res,
) => {
  const id = parseId(req.params.id, "Profile ID");
  const data = req.body as UpdateProfileInput;
  const profile = await profilesService.update(id, data);

  res.status(200).json({
    success: true,
    data: profile,
  });
};

export const deleteProfile: RequestHandler = async (
  req,
  res,
) => {
  const id = parseId(req.params.id, "Profile ID");
  await profilesService.delete(id);

  res.status(200).json({
    success: true,
    message: "Profile deleted successfully",
  });
};
