import { useRouteError } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";

import { ErrorBody } from "~/utilities/ErrorBody";

import { requireUserSession } from "~/server/auth.server";
import { getHospital } from "~/server/getters.server";
import { Hospital } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);

  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const type = url.searchParams.get("type") || "";

  let hospitals: Hospital[] = [];
  if ((type === "clues" || type === "hospitalName") && query.length >= 3) {
    hospitals = await getHospital(query, type);
  }

  return Response.json({ hospitals });
};

// All errors for this route will be caught by this ErrorBoundary.
export function ErrorBoundary() {
  // To obtain the thrown object, we use the 'useRouteError' hook.
  const error = useRouteError();

  return (
    <ErrorBody
      error={error}
      routetext="_app.indre.hospital.tsx"
      className="col-start-1 col-span-12 my-3 pt-1 pb-2 px-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
    />
  );
}
