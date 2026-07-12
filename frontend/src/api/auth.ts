import api from "./axios";
import { getToken } from "../services/authStorage";

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
};

export async function getCurrentUser() {
  const token = getToken();

  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function uploadProfileImage(file: File) {
  const token = getToken();

  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/users/profile-image",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function login(
  email: string,
  password: string
) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await api.post(
    "/auth/login",
    formData
  );

  return response.data;
}

export async function register(
  name : string,
  email : string,
  password : string
){
  const response = await api.post(
    "/auth/register",
    {
      name,
      email,
      password
    }
  );

  return response.data;
}