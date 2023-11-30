import Head from "next/head";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { components } from "@/slices/marketing";
import MarketingLayout from "@/components/MarketingLayout";
import { getLanguages } from "@/utils/getLanguages";
import { notFound } from "next/navigation";

type PageParams = { uid: string; locale: string };

export default async function LandingPage({ params }: { params: PageParams }) {
  console.log("PARAMS", params)
  const client = createClient();

  const page = await client
    .getByUID<Content.LandingPageDocument>("landing_page", params.uid, {
      lang: params.locale,
    })
    // .catch(() => notFound());

  const [header, footer, languages] = await Promise.all([
    client.getSingle<Content.HeaderDocument>("header", {
      lang: params.locale,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
      lang: params.locale,
    }),
    getLanguages(page, client),
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

  console.log(pages.map((page) => ({ uid: page.uid })));

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
