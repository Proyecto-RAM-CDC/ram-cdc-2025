import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import PublicNavigation from "~/components/navigation/PublicNavigation";
import { getProfileFromSession } from "~/server/auth.server";

// Runs on the server only.
// Runs for GET requests made to the route. But runs after any action functions (if any).
// On the initial server render, it will provide data to the HTML document.
// On navigations in the browser, Remix will call the function via fetch from the browser.
export async function loader({ request }: LoaderFunctionArgs) {
  return getProfileFromSession(request);
}

export default function PublicHomePage() {
  return (
    <>
      <PublicNavigation />
      <Outlet />
    </>
  );
}
