const LOGIN_API_URL = "https://dummyjson.com/user/login";
const AUTH_ME_API_URL = "https://dummyjson.com/auth/me";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthUserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type LoginError = {
  message: string;
  statusCode?: number;
};

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(LOGIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error: LoginError = {
      message: data.message ?? "Login failed. Please try again.",
      statusCode: response.status,
    };

    throw error;
  }

  return data as LoginResponse;
}

export async function getAuthUser(accessToken: string): Promise<AuthUserResponse> {
  const response = await fetch(AUTH_ME_API_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error: LoginError = {
      message: data.message ?? "Token verification failed.",
      statusCode: response.status,
    };

    throw error;
  }

  return data as AuthUserResponse;
}