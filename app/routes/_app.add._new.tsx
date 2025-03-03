import { useOutletContext, Outlet, useRouteError } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ErrorBody } from "~/utilities/ErrorBody";

import { requireUserSession } from "~/server/auth.server";
import Steps from "~/components/stepwise/Steps";
import { AppProps } from "~/utilities/types";

type OutletContext = [
  AppProps["flushState"],
  AppProps["flushed"],
  AppProps["setFlushed"]
];

export default function AddRecord() {
  const [flushState, flushed, setFlushed] = useOutletContext<OutletContext>();

  return (
    <>
      <Steps />
      <Outlet context={[flushState, flushed, setFlushed]} />
    </>
  );
}

// Runs on the server only.
// Runs for GET requests made to the route. But runs after any action functions (if any).
// On the initial server render, it will provide data to the HTML document.
// On navigations in the browser, Remix will call the function via fetch from the browser.
export async function loader({ request }: LoaderFunctionArgs) {
  const profileId = await requireUserSession(request);
  return profileId;
}

// All errors for this route will be caught by this ErrorBoundary.
export function ErrorBoundary() {
  // To obtain the thrown object, we use the 'useRouteError' hook.
  const error = useRouteError();

  return (
    <ErrorBody
      error={error}
      routetext="_app.add._new.tsx"
      className="col-start-1 col-span-12 my-3 pt-1 pb-2 px-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
    />
  );
}
