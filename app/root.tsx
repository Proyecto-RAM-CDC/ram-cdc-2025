import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useMatches,
} from "@remix-run/react";

import Footer from "~/components/footer/Footer";
import RootCatchBoundary from "~/components/catchboundary/root";
import RootErrorBoundary from "~/components/errorboundary/root";
import tailwindstyles from "~/styles/tailwind_input.css?url";
import footerstyles from "~/styles/FooterStyles.css?url";
import indrestyles from "~/styles/indre.css?url";
import loaderstyles from "~/styles/loaderanimation.css?url";
import styleOL from "~/styles/styleOL.css?url";

export default function App() {
  const matches = useMatches();
  // @ts-expect-error: TS2339
  const disableJS = matches.some((match) => match.handle?.disableJS);

  return (
    <html lang="es">
      <head>
        <title>
          Uso de antibióticos en unidades de primer nivel de atención.
        </title>
        <meta
          name="description"
          content="Uso de antibióticos en unidades de primer nivel de atención."
        />
        <meta name="author" content="Dr William Peter Nicholson" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col min-w-full">
        <script
          type="text/javascript"
          src="https://openlayers.org/en/v6.5.0/build/ol.js"
        ></script>
        <Outlet />
        <Footer />
        <ScrollRestoration />
        {!disableJS && <Scripts />}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  // 'useRouteError' has the correct type (of 'unknown') since you can throw anything from your
  // loaders or actions. You don't need to explicitly set error to 'unknown', instead you should
  // use type narrowing to infer what the appropriate error type is.
  // Accesses the error thrown during an action, loader, or rendering to be used in an ErrorBoundary.
  const error = useRouteError();

  // When true, this is what used to go to 'CatchBoundary' in Remix v1.
  // So in Remix v2 it represents an unhandled route based exception.
  if (isRouteErrorResponse(error)) {
    return (
      <RootCatchBoundary
        errorType={"Root CatchBoundary"}
        errorStatus={error.status}
        errorDataMessage={error.data?.message}
      />
    );
  }

  return <RootErrorBoundary errorType={"Root ErrorBoundary"} error={error} />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css?url" },
  { rel: "stylesheet", href: footerstyles },
  { rel: "stylesheet", href: tailwindstyles },
  { rel: "stylesheet", href: indrestyles },
  { rel: "stylesheet", href: loaderstyles },
  { rel: "stylesheet", href: "https://openlayers.org/en/v6.5.0/css/ol.css" },
  { rel: "stylesheet", href: styleOL },
];
