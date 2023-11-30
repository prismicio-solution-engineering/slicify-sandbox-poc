import Head from "next/head";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/marketing";
import { getLanguages } from "@/utils/getLanguages";
import MarketingLayout from "@/components/MarketingLayout";
import { ArticleListVertical } from "@/components/ArticleListVertical";


export default async function BlogIndex({params}: {params: {locale: string}}) {

  const client = createClient();
  //    ^ Automatically contains references to document types

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.BlogIndexDocument>("blog_index", {
      lang: params.locale,
    }),
    client.getSingle<Content.HeaderDocument>("header", {
        lang: params.locale,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
        lang: params.locale,
    })
  ])

  // const languages = await getLanguages(page, client, locales);
  const languages = await getLanguages(page, client);
  
  return (
    <>
      <Head>
        <title>{page.data.meta_title || "Slicify - Blog Home"}</title>
        <meta
          name="description"
          content={page.data.meta_title || "Slicify Blog, slices for everyone."}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarketingLayout
        header={header.data}
        footer={footer.data}
        languages={languages}
      >
        <ArticleListVertical 
          // articles={articles}
          page={page}
        />
        <SliceZone slices={page.data.slices} components={components} />
      </MarketingLayout>
    </>
  );
}
