import { fetcher, mutation } from "./api";

export interface IProfileResponse {
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      address: string;
      gender: string;
      image: string;
    };
  };
}

export interface IUpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  address?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const getProfile = () => fetcher<IProfileResponse>("/profile");

export const updateProfile = (payload: IUpdateProfilePayload) =>
  mutation<IProfileResponse>("/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });