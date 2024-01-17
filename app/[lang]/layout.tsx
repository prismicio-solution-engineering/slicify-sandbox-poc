import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

// Only locales in the repo can be targeted, others will 404
export const dynamicParams = false

export async function generateStaticParams() {
  const client = createClient();
  const repository = await client.getRepository();

  const locales = repository.languages.map((lang) => {return {lang:lang.id}});
  
  return locales
}

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        {children}
        <PrismicPreview repositoryName={repositoryName} />
    </>
  );
}
