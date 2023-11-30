import Head from "next/head";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/marketing";
import { getLanguages } from "@/utils/getLanguages";
import MarketingLayout from "@/components/MarketingLayout";
import { getLocales } from "@/utils/getLocales";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const locales = await getLocales();
  
  const client = createClient();

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.HomePageDocument>("home_page", { lang }),
    client.getSingle<Content.HeaderDocument>("header", { lang }),
    client.getSingle<Content.FooterDocument>("footer", { lang }),
  ]);

  const languages = await getLanguages(page, client, locales);


  return (
    <>
      <Head>
        <title>{page.data.meta_title || "Slicify | Home"}</title>
        <meta
          name="description"
          content={page.data.meta_title || "Slicify, slices for everyone."}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
