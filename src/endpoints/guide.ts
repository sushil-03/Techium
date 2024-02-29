import { axiosClient } from "./axios";
import Cookie from "js-cookie";

export const fetchGuide = async (id: string, pageParam: number) => {
  let link = `/items/launch_guides?fields=*,author.*,category.*,section.*&page=${pageParam}&limit=6&meta=*&sort[]=-date_created&`;
  if (id !== "") {
    link += `filter[section][_eq]=${id}`;
  }
  const res = await axiosClient("GET", link);
  return res;
};
export const getRelatedGuide = async (id: string) => {
  if (!id) return null;
  const link = `/items/launch_guides?fields=*,author.*,category.*,section.*&filter[category][_eq]=${id}`;
  const res = await axiosClient("GET", link);
  return res.data;
};

export const fetchGuidBySection = async (id: string) => {
  const link = `/items/launch_guides?fields=*,author.*,category.*,section.*&filter[section][_eq]=${id}`;
  const res = await axiosClient("GET", link);
  return res.data;
};

export const fetchSections = async () => {
  const access_Token = Cookie.get("accessToken");
  const res = await axiosClient("GET", "/items/guide_sections?sort[]=rank", {
    headers: {
      Authorization: `Bearer ${access_Token}`,
    },
  });
  return res.data;
};

export const getGuideById = async (id: string) => {
  const access_Token = Cookie.get("accessToken");

  const res = await axiosClient(
    "GET",
    `/items/launch_guides/${id}?fields=*,author.*,category.*,section.*`,
    {
      headers: {
        Authorization: `Bearer ${access_Token}`,
      },
    },
  );
  return res.data;
};
export const getGuideHomeData = async () => {
  const res = await axiosClient(
    "GET",
    `/items/guide_page?fields=*,cards.guide_card_id.*`,
  );
  return res.data;
};
