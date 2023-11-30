import Head from "next/head";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/marketing";
import { getLanguages } from "@/utils/getLanguages";
import MarketingLayout from "@/components/MarketingLayout";


export default async function Home({params}: {params: {locale: string}}) {

  const client = createClient();

  const [page,header,footer] = await Promise.all([
    client.getSingle<Content.HomePageDocument>("home_page", {
      lang: params.locale,
    }),
    client.getSingle<Content.HeaderDocument>("header", {
      lang: params.locale,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
      lang: params.locale,
    })
  ])

  // const languages = [];
  // const languages = await getLanguages(page, client, locales);
  const languages = await getLanguages(page, client); // Maybe use the languages from the repo API


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