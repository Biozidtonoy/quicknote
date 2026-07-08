import api from "./axios";

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