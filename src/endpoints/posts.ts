import { axiosClient } from "./axios";
export type FilterType = {
  limit: number;
  page: number;
  company?: string;
  category: string;
  userId?: string;
  search?: string;
  tags?: any;
  country?: string
};
export type RelatedProductFilterType = Omit<
  FilterType,
  "limit" | "page"
>;
import { request, gql } from 'graphql-request'
const temp = "https://api-ap-south-1.hygraph.com/v2/clsrmpcr01ekm01w9wrv6m48j/master"

export const getPosts = async (options: FilterType) => {
  console.log('oo', options);

  const variables = {
    category: (options.category && (options?.category !== "Any type")) ? options.category : undefined,
    company: (options.company && (options?.company !== "Any type")) ? options.company : undefined,
    userId: (options.userId && (options?.userId !== "Any type")) ? options.userId : undefined,
    tags: (options.tags && (options?.tags !== "Any type")) ? options.tags : undefined,
    search: (options.search && (options?.search !== "Any type")) ? options.search : undefined,
  };

  if (variables.category || variables.company || variables.userId || variables.tags || variables.search) {
    return getRelatedPost(options);
  }
  console.log('wrong call');

  const document = gql`
    query Blog() {
    blogs(
      orderBy:createdAt_ASC) {
      id
      category
      isFeatured
      revenue
      title
      freebody{
        html
      }
      body{
        html
      }
      tags
      dloguser{
        id
        name
        company
      }
      banner {
        url
      }
    }
  }
 `

  // const variables = {
  //   category: (options.category && (options?.category !== "Any type")) ? options.category : undefined,
  //   revenue: (options.revenue && (options?.revenue !== "Any type")) ? options.revenue : undefined,
  //   userId: (options.userId && (options?.userId !== "Any type")) ? options.userId : undefined,
  //   tags: (options.tags && (options?.tags !== "Any type")) ? options.tags : undefined,
  // };
  const res: any = await request(temp, document)
  console.log('response boyss', res);

  return res.blogs;
  // if (options.search !== "") {
  //   const link = `/items/posts?search=${options.search}&page=${options.page}&limit=${options.limit}&fields=*,attached_person.*&meta=*&sort[]=published_on`;
  //   const res = await axiosClient("GET", link);
  //   return res;
  // } else {
  //   let filterString = "";
  //   let flag = false;
  //   if (options.revenue && options.revenue !== "") {
  //     flag = true;
  //     filterString += `{"revenue":{"_eq":"${options.revenue}"}},`;
  //   }
  //   if (options.category && options.category !== "") {
  //     flag = true;
  //     filterString += `{"category":{"_eq":"${options.category}"}},`;
  //   }
  //   if (options.country && options.country !== "") {
  //     flag = true;
  //     filterString += `{"country":{"_eq":"${options.country}"}},`;
  //   }
  //   if (flag) {
  //     filterString = filterString.substring(0, filterString.length - 1);
  //   }

  //   const link = `/items/posts?page=${options.page}&limit=${options.limit}&filter={"_and":[${filterString}]}&fields=*,attached_person.*&meta=*&sort[]=published_on`;

  //   const res = await axiosClient("GET", link);
  //   return res;
  // }
};

export const getRelatedPost = async (options: RelatedProductFilterType) => {
  const document = gql`
      query RelatedPosts($category: String, $company: String, $userId: ID,$tags: [String!],$search:String) {
      relatedPosts: blogs(
        where: {
          OR:[
          {title_contains:$search}
          { category: $category }
          { dloguser: { id: $userId } }
          { dloguser: { company: $company } }
          { tags_contains_some: $tags }
          ]
        }
      ) {
        id
        category
        isFeatured
        revenue
        title
        freebody{
          html
        }
        body {
          html
        }
        tags
        dloguser {
          name
          company
        }
        banner {
          url
        }
      }
    }
  `

  const variables = {
    category: options?.category || undefined,
    company: options?.company || undefined,
    userId: options?.userId || undefined,
    tags: options?.tags || undefined,
    search: options?.search || undefined
  };


  const res: any = await request(temp, document, variables)
  console.log('boyaa', res);

  return res.relatedPosts;
  // client.query({
  //   query: RELATED_POSTS_QUERY,
  //   variables: variables,
  // }).then(result => {
  //   console.log(result.data.relatedPosts); // Access the related posts data here
  // }).catch(error => {
  //   console.error('Error fetching related posts:', error);
  // });








  // let filterString = "";
  // let flag = false;
  // if (options.revenue && options.revenue !== "") {
  //   flag = true;
  //   filterString += `{"revenue":{"_eq":"${options.revenue}"}},`;
  // }
  // if (options.category && options.category !== "") {
  //   flag = true;
  //   filterString += `{"category":{"_eq":"${options.category}"}},`;
  // }
  // if (flag) {
  //   filterString = filterString.substring(0, filterString.length - 1);
  // }
  // const link = `/items/posts?page=1&limit=3&filter={"_or":[${filterString}]}&fields=*,attached_person.*&meta=*`;

  // const res = await axiosClient("GET", link);
  // return res.data;
};
export const getFeaturedPosts = async (pageParam: any) => {

  const document = gql`
 query FeaturedBlog {
  blogs(where: {isFeatured: true}) {
      category
      isFeatured
      revenue
      title
      id
      banner {
        url
      }
  }
}
`
  const res: any = await request(temp, document)
  return res.blogs;

};

export const getPostById = async (id: string) => {
  console.log('nit', id);

  const document = gql`
 query FeaturedBlog($postId: ID!) {
  blogs(where: {id: $postId}) {
    id
        category
        isFeatured
        revenue
        title
        freebody{
          html
        }
        body {
          html
        }
        tags
        dloguser {
          name
          company
        bio

          profile{
            url
          }
        }
        banner {
          url
        }
  }
}
`
  const variables = {
    postId: id
  }
  const res: any = await request(temp, document, variables)
  console.log('giii', res);

  return res.blogs[0];

};
