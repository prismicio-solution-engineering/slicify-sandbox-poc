import React from "react";
import { ArticleListVertical } from "@/components/ArticleListVertical";
import { performSearch } from "@/utils/performSearch";
import { BlogArticleDocument } from "@/prismicio-types";
import MarketingLayout from "@/components/MarketingLayout";
import { getLanguages } from "@/utils/getLanguages";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import Head from "next/head";
import { getLocales } from "@/utils/getLocales";


const SearchPage = async (context) => {
  const { params } = context;
  const { lang } = params;

  const locales = await getLocales();

  const searchParams = context.searchParams;

  // Get the initial query parameter from the URL
  const initialQuery = searchParams.query || "";
  const searchQuery = Array.isArray(initialQuery)
    ? initialQuery[0]
    : initialQuery;

  const client = createClient();
  //    ^ Automatically contains references to document types

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.SearchDocument>("search", {
      lang: lang,
    }),
    client.getSingle<Content.HeaderDocument>("header", {
      lang: lang,
    }),
    client.getSingle<Content.FooterDocument>("footer", {
      lang: lang,
    }),
  ]);

  // Pass the initialQuery to performSearch
  const results = await performSearch(searchQuery ? searchQuery.trim() : "");

  const languages = await getLanguages(page, client, locales);


  return (
    <div>
      <Head>
        <title>{`Search results for ${initialQuery}`}</title>
        <meta
          name="description"
          content={"Slicify Search results, slices for everyone."}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarketingLayout
        header={header.data}
        footer={footer.data}
        languages={languages}
      >
        <ArticleListVertical articles={results ?? []} page={page} />
      </MarketingLayout>
    </div>
  );
};

export default SearchPage;
