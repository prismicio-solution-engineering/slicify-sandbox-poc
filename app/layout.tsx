import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
      <body>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
