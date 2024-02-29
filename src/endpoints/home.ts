import { axiosClient } from "./axios";
export type NewsLetterProps = {
  email: string;
};
import { request, gql } from 'graphql-request'
const temp = "https://api-ap-south-1.hygraph.com/v2/clsrmpcr01ekm01w9wrv6m48j/master"


export const getHomePageData = async () => {
  // const res = await axiosClient('GET', '/items/homepage?fields=*,faces.directus_files_id,recomended_case_studies.posts_id.*,recomended_case_studies.posts_id.attached_person.*');
  // const res = await axiosClient(
  //   "GET",
  //   "/items/homepage?fields=*,faces.directus_files_id,recomended_case_studies.posts_id.*,recomended_case_studies.posts_id.attached_person.*,recomended_case_studies.posts_id.category.*",
  // );
  // return res.data;
  const document = gql`
  query Homepages {
    homepages {
    createdAt
    faceTitle
    id
    publishedAt
    subtitle
    updatedAt
    faces {
      url
      id
    }
    headline {
      html
    }
    heroImage {
      url
    }
    heroImage2 {
      url
    }
    heroImage3{
      url
    }
    title
    description {
      html
    } 
    subsections
    recomended_case_studies {
      title
      id
      banner {
        url
      }
      revenue
      category
    }
  }
  }`
  const res: any = await request(temp, document)
  console.log("WHHHh", res.homepages[0]);
  return res.homepages[0];


};

export const handleNewsLetter = async (data: NewsLetterProps) => {
  const res = await axiosClient("POST", "/items/newsletter_emails", data);
  return res.data;
};

export const getNewsLetterMail = async (email: string) => {
  const res = await axiosClient(
    "GET",
    `/items/newsletter_emails?filter[email][_eq]=${email}`,
  );
  return res.data;
};
