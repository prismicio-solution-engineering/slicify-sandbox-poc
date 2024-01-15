import React from "react";
import { ArticleListVertical } from "@/components/ArticleListVertical";
import { performSearch } from "@/utils/performSearch";
import { BlogArticleDocument } from "@/prismicio-types";
import MarketingLayout from "@/components/MarketingLayout";
import { getLanguages } from "@/utils/getLanguages";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { getLocales } from "@/utils/getLocales";


const SearchResults = async ({
    params: { lang }, initialQuery
  }: {
    params: { lang: string };
    initialQuery: string
  }) => {

  const locales = await getLocales();

  // Get the initial query parameter from the URL
//   const initialQuery = searchParams.query || "";
  const searchQuery = Array.isArray(initialQuery)
    ? initialQuery[0]
    : initialQuery;



  const client = createClient();
  //    ^ Automatically contains references to document types

  const [page, header, footer] = await Promise.all([
    client.getSingle<Content.SearchDocument>("search", { lang }),
    client.getSingle<Content.HeaderDocument>("header", { lang }),
    client.getSingle<Content.FooterDocument>("footer", { lang }),
  ]);

  // Pass the initialQuery to performSearch
  const results = await performSearch(searchQuery ? searchQuery.trim() : "", lang);

  const languages = await getLanguages(page, client, locales);


  return (
    <>
      <MarketingLayout
        header={header.data}
        footer={footer.data}
        languages={languages}
      >
        <ArticleListVertical lang={lang} searchResults={results ?? []} page={page} />
      </MarketingLayout>
    </>
  );
};

export default SearchResults;
