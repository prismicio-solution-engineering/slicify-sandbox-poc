import Head from "next/head";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { components as mktComponents } from "@/slices/marketing";
import { components as blogComponents } from "@/slices/blog";
import {
  blogArticleGraphQuery, blogArticleLinkedArticlesGraphQuery,
} from "@/utils/graphQueries";
import { getLanguages } from "@/utils/getLanguages";
import BlogLayout from "@/components/BlogLayout";
import { SliceZone as TSliceZone } from "@prismicio/types"
import { Content } from "@prismicio/client";
import { notFound } from "next/navigation";

type PageParams = { uid: string };

export default async function BlogArticle({params}: {params: PageParams}) {
  // console.log('Params: ', params)

  const client = createClient();


  const blogArticle = await client
    .getByUID<prismic.Content.BlogArticleDocument>("blog_article", params.uid, {graphQuery: blogArticleGraphQuery})
    .catch(() => notFound());
    // console.log(blogArticle)
    
  return (
    <>
    <BlogLayout
        header={header.data}
        footer={footer.data}
        languages={params.locale}
        page={blogArticle}
      >
        <SliceZone
          slices={blogArticle.data.slices}
          components={{ ...mktComponents, ...blogComponents }}
        />
      </BlogLayout>
    </>
  )

}

// Paths
export async function generateStaticParams() {
  
  const client = createClient();
  const pages = await client.getAllByType("blog_article");

  // console.log(pages.map((page) => ({ uid: page.uid, category: page.data.category.uid })));

  return pages.map((page) => {
    return { uid: page.uid, category: page.data.category.uid };
  });

}
