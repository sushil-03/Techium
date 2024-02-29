import React, { useEffect } from "react";
import { useUserStore } from "@/hooks/state/userState";
import { useGetUserById } from "@/hooks/query/getUserById";
import { useState } from "react";
import { useFetchNewsLetter } from "@/hooks/query/getNewLetter";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState("");
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decoded = jwt_decode(token) as any;
      setId(decoded.id || "");
      // const user_id = decoded.id;
      // if (user_id) {
      // }
    }
  }, []);

  const { data } = useGetUserById(id || "");
  const setUser = useUserStore((state) => state.setUser);
  const setNewsLetter = useUserStore((state) => state.setNewsLetter);
  const { data: newLetter, refetch } = useFetchNewsLetter(data?.email);

  useEffect(() => {
    if (!data) return;
    setUser({
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      image: data.image || "",
      email: data.email || "",
      auth_type: data.auth_type || "",
      bio: data.bio || "",
      location: data.location || "",
      occupation: data.occupation || "",
      personal_link: data.personal_link || "",
    });
    refetch();
  }, [data, refetch, setUser]);

  useEffect(() => {
    if (newLetter && newLetter.length > 0) {
      setNewsLetter(true);
    }
  }, [newLetter, setNewsLetter]);
  return <div className="dark:bg-black bg-white">{children}</div>;
};

export default MainContainer;
