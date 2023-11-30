import Head from "next/head";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { components } from "@/slices/marketing";
import MarketingLayout from "@/components/MarketingLayout";
import { getLanguages } from "@/utils/getLanguages";
import { notFound } from "next/navigation";
import { getLocales } from "@/utils/getLocales";

type PageParams = { uid: string; lang: string };

export default async function LandingPage({ params }: { params: PageParams }) {
  const locales = await getLocales();
  
  const client = createClient();

  const page = await client
    .getByUID<Content.LandingPageDocument>("landing_page", params.uid, {
      lang: params.lang,
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
    <>
      <Head>
        <title>{page.data.meta_title || "Slicify - Landing Page"}</title>
        <meta
          name="description"
          content={page.data.meta_title || "Slicify, slices for everyone."}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarketingLayout
        header={header.data}
        footer={footer.data}
        languages={languages}
      >
        <SliceZone slices={page.data.slices} components={components} />
      </MarketingLayout>
    </>
  );
}

// Paths
export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("landing_page", { lang: "*" });

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
