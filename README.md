This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- *******88 -->

import { axiosClient } from "./axios";
export type FilterType = {
limit: number;
page: number;
revenue: string;
category: string;
userId?: string;
search: string;
tags?: any;
country?:string
};
export type RelatedProductFilterType = Omit<
FilterType,
"search" | "limit" | "page"

> ;
> import Cookie from "js-cookie";
> import { request, gql } from 'graphql-request'
> const temp = "https://api-ap-south-1.hygraph.com/v2/clsrmpcr01ekm01w9wrv6m48j/master"

export const getPosts = async (options: FilterType) => {
console.log('fucked up 2', options);
const variables = {
category: (options.category && (options?.category !== "Any type")) ? options.category : undefined,
revenue: (options.revenue && (options?.revenue !== "Any type")) ? options.revenue : undefined,
userId: (options.userId && (options?.userId !== "Any type")) ? options.userId : undefined,
tags: (options.tags && (options?.tags !== "Any type")) ? options.tags : undefined,
};

if(variables.category || variables.revenue || variables.userId || variables.tags){
return getRelatedPost(options);
}
const document = gql`
query Blog($category: String, $revenue: String, $userId: ID,$tags: [String!]) {
blogs(where: {
OR:[
{ category: $category }
{ revenue: $revenue }
{ dloguser: { id: $userId } }
{ tags_contains_some: $tags }
]

        }) {

      id
      category
      isFeatured
      revenue
      title
      freebody
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
// category: (options.category && (options?.category !== "Any type")) ? options.category : undefined,
// revenue: (options.revenue && (options?.revenue !== "Any type")) ? options.revenue : undefined,
// userId: (options.userId && (options?.userId !== "Any type")) ? options.userId : undefined,
// tags: (options.tags && (options?.tags !== "Any type")) ? options.tags : undefined,
// };
const res: any = await request(temp, document, variables)
console.log('response boyss', res);

return res.blogs;
// if (options.search !== "") {
// const link = `/items/posts?search=${options.search}&page=${options.page}&limit=${options.limit}&fields=*,attached_person.*&meta=*&sort[]=published_on`;
// const res = await axiosClient("GET", link);
// return res;
// } else {
// let filterString = "";
// let flag = false;
// if (options.revenue && options.revenue !== "") {
// flag = true;
// filterString += `{"revenue":{"_eq":"${options.revenue}"}},`;
// }
// if (options.category && options.category !== "") {
// flag = true;
// filterString += `{"category":{"_eq":"${options.category}"}},`;
// }
// if (options.country && options.country !== "") {
// flag = true;
// filterString += `{"country":{"_eq":"${options.country}"}},`;
// }
// if (flag) {
// filterString = filterString.substring(0, filterString.length - 1);
// }

// const link = `/items/posts?page=${options.page}&limit=${options.limit}&filter={"_and":[${filterString}]}&fields=*,attached_person.*&meta=*&sort[]=published_on`;

// const res = await axiosClient("GET", link);
// return res;
// }
};

export const getRelatedPost = async (options: RelatedProductFilterType) => {
console.log('fucked up options', options);
const document = gql`
query RelatedPosts($category: String, $revenue: String, $userId: ID,$tags: [String!]) {
relatedPosts: blogs(
where: {
OR:[
{ category: $category }
{ revenue: $revenue }
{ dloguser: { id: $userId } }
{ tags_contains_some: $tags }
]

        }
      ) {
        id
        category
        isFeatured
        revenue
        title
        freebody
        body {
          html
        }
        tags
        dloguser {
          profile {
            id
          }
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
revenue: options?.revenue || undefined,
userId: options?.userId || undefined,
tags: options?.tags || undefined
};

const res: any = await request(temp, document, variables)
console.log('boyaa', res);

return res.relatedPosts;
// client.query({
// query: RELATED_POSTS_QUERY,
// variables: variables,
// }).then(result => {
// console.log(result.data.relatedPosts); // Access the related posts data here
// }).catch(error => {
// console.error('Error fetching related posts:', error);
// });

// let filterString = "";
// let flag = false;
// if (options.revenue && options.revenue !== "") {
// flag = true;
// filterString += `{"revenue":{"_eq":"${options.revenue}"}},`;
// }
// if (options.category && options.category !== "") {
// flag = true;
// filterString += `{"category":{"_eq":"${options.category}"}},`;
// }
// if (flag) {
// filterString = filterString.substring(0, filterString.length - 1);
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
banner {
url
}
}
}

`

const res: any = await request(temp, document)
return res.blogs;

// const link = `/items/posts?filter[type][_eq]=featured&page=${pageParam}&limit=6&fields=*,category.*&meta=*`;
// const res = await axiosClient("GET", link);

// return res;
};

export const getPostById = async (id: string) => {
const access_Token = Cookie.get("accessToken");

const res = await axiosClient(
"GET",
`/items/posts/${id}?fields=*,attached_person.*`,
{
headers: {
Authorization: `Bearer ${access_Token}`,
},
},
);
return res.data;
};
