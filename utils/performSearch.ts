import * as prismic from "@prismicio/client";
import { blogIndexGraphQuery } from "@/utils/graphQueries";
import { repositoryName } from "@/prismicio"

const client = prismic.createClient(
    repositoryName
);

export const performSearch = async (query: string, lang: string) => {
    if (query) {
        try {
            const response = await client.getByType("blog_article", {
                lang,
                filters: [
                    prismic.filter.fulltext("my.blog_article.title", query)],
                graphQuery: blogIndexGraphQuery,
            });
            return response.results;
        } catch (error) {
            console.error("Error searching Prismic:", error);
            return undefined;
        }
    } else {
        return [];
    }
};