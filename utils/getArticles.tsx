import { createClient } from "@/prismicio";

const client = createClient();

export const getArticles = async () => {
    try {
        const articles = await client.getAllByType("blog_article", {
          });
        return articles;
    } catch(error) {
        console.log("Error fetching Showcase websites :", error);
        return [];
    }
}