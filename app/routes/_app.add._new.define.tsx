import { Outlet, useRouteError } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ErrorBody } from "~/utilities/ErrorBody";
import { requireUserSession } from "~/server/auth.server";

export default function DefineRecord() {
  return (
    <main className="max-w-7xl mx-auto mt-10 mb-24 bg-gradient-to-br from-base-100 from-50% to-base-300 to-95% shadow-2xl rounded-lg">
      <h1 className="text-primary text-base text-center sm:text-lg font-bold">
        Seleccione los síntomas y/o antecedentes que refiere el paciente
      </h1>
      <Outlet />
    </main>
  );
}

// Runs on the server only.
// Runs for GET requests made to the route. But runs after any action functions (if any).
// On the initial server render, it will provide data to the HTML document.
// On navigations in the browser, Remix will call the function via fetch from the browser.
export async function loader({ request }: LoaderFunctionArgs): Promise<null> {
  await requireUserSession(request);
  return null;
}

export function headers() {
  return {
    "Cache-Control": "max-age=3",
  };
}

// All errors for this route will be caught by this ErrorBoundary.
export function ErrorBoundary() {
  // To obtain the thrown object, we use the 'useRouteError' hook.
  const error = useRouteError();

  return (
    <ErrorBody
      error={error}
      routetext="_app.add._new.define.tsx"
      className="col-start-1 col-span-12 my-3 pt-1 pb-2 px-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
    />
  );
}
