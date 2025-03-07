import { useLoaderData, useRouteError } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import { requireUserSession } from "~/server/auth.server";
import { getVisitation, getClinicos } from "~/server/getters.server";
import { updateVisitationNotes } from "~/server/updates.server";

import AlgorithmEDAS from "~/algorithms/AlgorithmEDAS";
import AlgorithmITS from "~/algorithms/AlgorithmITS";
import AlgorithmIVU from "~/algorithms/AlgorithmIVU";
import AlgorithmIRAS from "~/algorithms/AlgorithmIRAS";

import { generateNotesEdasPositive as generateNotesEDASp } from "~/algorithms/EDAS/utiltiesGenerateNotes";
import { generateNotesEdasNegative as generateNotesEDASn } from "~/algorithms/EDAS/utiltiesGenerateNotes";
import { generateIrasNotes as generateNotesIRAS } from "~/algorithms/IRAS/utilitiesForDiagnosis";

import { ErrorBody } from "~/utilities/ErrorBody";

import { AlgorithmData } from "~/utilities/types";
import { Visitation, Clinicos } from "@prisma/client";

export default function DefineRecord() {
  const loaderData = useLoaderData<AlgorithmData>();
  // There isn't yet provision for having multiple primary conditions in a single visit.
  // Hence, for now, we can safely assume that the first primary condition is the only one.
  const primaryCondition: string = loaderData.visitation.primaryConditions[0];

  if (primaryCondition === "Infección del tracto urinario") {
    return (
      <main className="mx-auto max-w-7xl my-16">
        <div className="flex justify-center items-center mx-6 py-4 sm:mx-8 xl:mx-10 border-2 border-accent rounded-md bg-gradient-to-br from-base-100 from-50% to-base-300 to-95% shadow-2xl">
          <AlgorithmIVU loaderData={loaderData} />
        </div>
      </main>
    );
  } else if (primaryCondition === "Infecciones de transmisión sexual") {
    return (
      <main className="mx-auto max-w-7xl my-16">
        <div className="flex justify-center items-center mx-6 py-4 sm:mx-8 xl:mx-10 border-2 border-accent rounded-md bg-gradient-to-br from-base-100 from-50% to-base-300 to-95% shadow-2xl">
          <AlgorithmITS loaderData={loaderData} />
        </div>
      </main>
    );
  } else if (
    primaryCondition === "Infecciones del aparato respiratorio superior"
  ) {
    return (
      <main className="mx-auto max-w-7xl my-16">
        <div className="flex justify-center items-center mx-6 py-4 sm:mx-8 xl:mx-10 border-2 border-accent rounded-md bg-gradient-to-br from-base-100 from-50% to-base-300 to-95% shadow-2xl">
          <AlgorithmIRAS loaderData={loaderData} />
        </div>
      </main>
    );
  } else if (primaryCondition === "Enfermedades diarreicas agudas") {
    return (
      <main className="mx-auto max-w-7xl my-16">
        <div className="flex justify-center items-center mx-6 py-4 sm:mx-8 xl:mx-10 border-2 border-accent rounded-md bg-gradient-to-br from-base-100 from-50% to-base-300 to-95% shadow-2xl">
          <AlgorithmEDAS loaderData={loaderData} />
        </div>
      </main>
    );
  }
}

// Runs on the server only.
// If a non-GET request is made to the route, this action function is called before
// any loader functions (if any).
export async function action({ request }: ActionFunctionArgs) {
  await requireUserSession(request);

  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const id = url.searchParams.get("id") || "";

  if (query === "") {
    return null;
  }

  // const formData = await request.formData();
  // const propsJson = formData.get("props");

  if (query === "EDASp") {
    return null;
    /* if (typeof propsJson === "string") {
      const props = JSON.parse(propsJson);
      const notes = generateNotesEDASp(props);
      updateVisitationNotes(id, notes);
      return null;
    } */
  } else if (query === "EDASn") {
    return null;
    /* if (typeof propsJson === "string") {
      const props = JSON.parse(propsJson);
      const notes = generateNotesEDASn(props);
      updateVisitationNotes(id, notes);
      return null;
    } */
  } else if (query === "IRAS") {
    return null;
    //if (typeof propsJson === "string") {
    //  const props = JSON.parse(propsJson);
    //  const notes = generateNotesIRAS(props);
    //  updateVisitationNotes(id, notes);
    //  return null;
    //}
  }
}

// Runs on the server only.
// Runs for GET requests made to the route. But runs after any action functions (if any).
// On the initial server render, it will provide data to the HTML document.
// On navigations in the browser, Remix will call the function via fetch from the browser.
export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  const url = new URL(request.url);
  const clinicosId: string | null = url.searchParams.get("cID");
  const visitationId: string | null = url.searchParams.get("vID");

  if (!clinicosId) {
    throw new Error(
      "Revise: No se proporcionó identificación del paciente (clinicosId)."
    );
  }
  if (!visitationId) {
    throw new Error(
      "Revise: No se proporcionó identificación del paciente (visitationId)."
    );
  }

  const clinicos: Clinicos | null = await getClinicos(clinicosId);
  const visitation: Visitation | null = await getVisitation(visitationId);

  if (!clinicos) {
    throw new Error("Revise: Ningún paciente encontrado (clinicos).");
  }
  if (!visitation) {
    throw new Error("Revise: Ningún paciente encontrado (visitation).");
  }

  return Response.json({ visitation, clinicos });
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
      routetext="_app.add._new.revise.tsx"
      className="col-start-1 col-span-12 my-3 pt-1 pb-2 px-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
    />
  );
}
