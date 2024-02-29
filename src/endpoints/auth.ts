import { auth, provider } from "@/lib/firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { axiosClient } from "./axios";
import { useUserStore } from "@/hooks/state/userState";
import Cookie from "js-cookie";
import { handleNewsLetter } from "./home";
export type DecodedType = {
  exp: number;
  iat: number;
  id: string;
};
// const password = "12345678";
const password = "**********";
export interface SignInUserProp {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  password: string;
  auth_type: string;
  location: string;
  occupation: string;
  personal_link: string;
  bio: string;
  role: string;
}
export interface SigninDataProp {
  user: SignInUserProp;
  isSubscribe: boolean;
}
export interface LoginDataProp {
  email: string;
  password: string;
}

const handleUserData = async (data: any) => {
  const res = await getUserByEmail(data.email);
  console.log("email", res);

  if (!res) return (window.location.href = "/signup/detail");
  console.log("res", res);

  if (res.length > 0) {
    // TODO If user data exist
    await handleLogInByMail({ email: data.email, password: data.password });
    window.location.href = "/";
  } else {
    // TODO If Not  exist
    data.auth_type = "google";
    localStorage.setItem("@ownerpreneurGoogle", JSON.stringify(data));
    window.location.href = "/signup/detail";
  }
};
export const saveUserData = (id: string) => {
  if (!id) {
    return;
  }
  localStorage.setItem("@ownerpreneurUser", JSON.stringify(id));
  window.location.href = "/";
};
// export const handle
export const handleGoogleLogin = () => {
  const userData = {
    name: "",
    email: "",
    profile: "",
  };

  signInWithPopup(auth, provider)
    .then((data) => {
      userData.name = data?.user?.displayName || "";
      userData.email = data?.user?.email || "";
      userData.profile = data?.user?.photoURL || "";
      if (userData.email !== "") {
        handleUserData(userData);
      }
    })
    .catch((error) => {
      console.log("Something went wrong", error);
    });
  return userData;
};

export const getUserByEmail = async (email: string) => {
  const res = await axiosClient("GET", `/users?filter[email][_eq]=${email}`);
  console.log("user by email", res);

  return res.data;
};
export const handleSignInByMail = async (signinData: SigninDataProp) => {
  console.log("checking subscrib", signinData);

  signinData.user.password = password;
  signinData.user.role = "3d91713a-db88-4123-9e72-881d49a7d26b";

  const res = await axiosClient("POST", `/users/`, signinData.user);

  await handleLogInByMail({
    email: signinData.user.email,
    password: signinData.user.password,
  });
  if (signinData.isSubscribe) {
    await handleNewsLetter({
      email: signinData.user.email,
    });
  }
  // saveUserData(res?.data.id); for checking
  return res.data;
};

export const handleLogInByMail = async (loginData: LoginDataProp) => {
  loginData.password = password;
  const response = await axiosClient("POST", `/auth/login`, loginData).then(
    (res) => {
      Cookie.set("accessToken", res.data.access_token, {
        expires: res.data.expires,
      });
      Cookie.set("refresh-token", res.data.refresh_token, {
        expires: res.data.expires,
      });
    },
  );
  // handleUserData(loginData);

  return response;
};

export const fetchUserById = async (id: string) => {
  const res = await axiosClient("GET", `users/${id}`);
  return res.data;
};
export const updateUser = async (userData: any) => {

  // const res = await axiosClient("PATCH", `users/${userData.id}`,userData.data);
  // return res.data;
  return [0]
}