// "app/routes/logout.ts" is called only by the logout button in the navigation bar,
// which can be found in "app/components/navigation/PublicNavigation.tsx".
import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/server/auth.server";

// Runs on the server only.
// If a non-GET request is made to the route, this action function is called before
// any loader functions (if any).
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw Response.json({ message: "Método de solicitud no válido" }, { status: 400 });
  }

  return destroyUserSession(request);
}
