import { NextRequest, NextResponse } from 'next/server';
// import { createClient } from '@/prismicio';

export async function middleware(request: NextRequest) {
  // const client = createClient();
  // const repository = await client.getRepository();

  //const locales = repository.languages.map((lang) => lang.id); //to check how to avoid hardcoding locals TODO
  const locales =["en-us","fr-fr"]
  const defaultLocale = locales[0];

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // // Check if pathname is search without query string
  // const pathnameIsSearchWithoutQuery = pathname === '/search' && !request.url.includes('?')

  // if (pathnameIsMissingLocale || pathnameIsSearchWithoutQuery) {
  //   return NextResponse.rewrite(
  //     new URL(`/${defaultLocale}${pathname}`, request.url)
  //   );
  // }

}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: ['/((?!_next|api|slice-simulator|icon.svg).*)'],
};
