import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { components as mktComponents } from "@/slices/marketing";
import { components as blogComponents } from "@/slices/blog";
import {
  blogArticleGraphQuery,
  blogArticleLinkedArticlesGraphQuery,
} from "@/utils/graphQueries";
import { getLanguages } from "@/utils/getLanguages";
import BlogLayout from "@/components/BlogLayout";
import { SliceZone as TSliceZone } from "@prismicio/types";
import { Content } from "@prismicio/client";
import { notFound } from "next/navigation";
import { getLocales } from "@/utils/getLocales";

type PageParams = { uid: string; lang: string };

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_article", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default async function BlogArticle({ params }: { params: PageParams }) {
  const locales = await getLocales();

  const client = createClient();

  const page = await client
    .getByUID<prismic.Content.BlogArticleDocument>("blog_article", params.uid, {
      graphQuery: blogArticleGraphQuery,
    })
    .catch(() => notFound());

  const [header, footer, languages] = await Promise.all([
    client.getSingle<Content.HeaderDocument>("header", {
      lang: params.lang,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
      lang: params.lang,
    }),
    getLanguages(page, client, locales),
  ]);

  return (
    <BlogLayout
      header={header.data}
      footer={footer.data}
      languages={languages}
      page={page}
    >
      <SliceZone
        slices={page.data.slices}
        components={{ ...mktComponents, ...blogComponents }}
      />
    </BlogLayout>
  );
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
