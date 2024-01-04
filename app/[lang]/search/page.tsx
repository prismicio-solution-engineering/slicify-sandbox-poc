import React from "react";
import { ArticleListVertical } from "@/components/ArticleListVertical";
import { performSearch } from "@/utils/performSearch";
import { BlogArticleDocument } from "@/prismicio-types";
import MarketingLayout from "@/components/MarketingLayout";
import { getLanguages } from "@/utils/getLanguages";
import { Content, asText } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { getLocales } from "@/utils/getLocales";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("search");

  return {
    title: asText(page.data.title),
    description: `${page.data.title} : ${page.data.title}`,
  };
}

export default async function SearchPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: string };
  searchParams: { query?: string; page?: string };
}) {

  const locales = await getLocales();

  // Get the initial query parameter from the URL
  const initialQuery = searchParams.query || "";

  const client = createClient();

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.SearchDocument>("search", {
      lang,
    }),
    client.getSingle<Content.HeaderDocument>("header", {
      lang,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
      lang,
    }),
  ]);

  // Pass the initialQuery to performSearch
  const results = await performSearch(initialQuery ? initialQuery.trim() : "", lang=lang );
  const languages = await getLanguages(page, client, locales);

  return (
    <>
      <MarketingLayout
        header={header.data}
        footer={footer.data}
        languages={languages}
      >
        <ArticleListVertical page={page} searchResults={results ?? []} lang={lang} />
      </MarketingLayout>
    </>
  );
}
