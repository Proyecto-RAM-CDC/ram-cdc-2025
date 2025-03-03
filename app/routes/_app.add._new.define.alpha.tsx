import { Form, Link, useSubmit, useRouteError } from "@remix-run/react";
import {
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { ErrorBody } from "~/utilities/ErrorBody";
import { requireUserSession } from "~/server/auth.server";
import Define from "~/components/inputgroups/DefineCondition";
import hasPrimaryCondition from "~/utilities/HasPrimary";
import { getSecondaryConditions } from "~/server/getters.server";
import {
  updateSecondaryCondition,
  updateEvacuation,
  updateVomitos,
} from "~/server/updates.server";
import {
  usePrimaryConditionStore,
  useStepStore,
  useSecondarySymptomStore,
  useClinicalIDStore,
  useVisitationIDStore,
} from "~/state/store";
import KeyToString from "~/utilities/KeyToString";

type NewSecondaryCondition = {
  clinicosId: string;
  visitationId: string;
  evacuaciones?: string;
  vomitos?: string;
  [key: string]: string | undefined;
};

const anySelected = (currentValue: boolean): boolean => currentValue === false;

const convertCheckboxValuesToArray = (
  newData: { [key: string]: string | undefined },
  existingData: string[]
): string[] => {
  // Always start with an empty array of secondary conditions.
  const checkboxValues: string[] = [];

  // Iterate over the 'newData' - but only for 'values' that are 'selected' or 'unselected'.
  // This allows me to determine if the checkbox is checked or not, which the 'action' function
  // (see below) will use to update the database.
  Object.entries(newData).forEach(([key, value]) => {
    if (value === "selected" || value === "unselected") {
      // Check if the 'key' is already in the 'existingData' array:
      if (existingData.includes(key)) {
        // If it is, then check if the 'value' is 'unselected':
        if (value === "unselected") {
          // If it is, then remove it from the 'existingData' array:
          existingData.splice(existingData.indexOf(key), 1);
        }
      } else {
        // If 'key' is not in the 'existingData' array, then check if the 'value' is 'selected':
        if (value === "selected") {
          // If it is, then add it to the 'checkboxValues':
          checkboxValues.push(key);
        }
      }
    }
  });

  // Now append the values from the 'existingData' to the 'checkboxValues' - knowing that
  // the 'existingData' array will only contain values that were 'selected' in the form - with
  // any 'unselected' values having been removed from it:
  existingData.forEach((key) => {
    checkboxValues.push(key);
  });

  return checkboxValues;
};

export default function DefineRecord() {
  const { primaryConditions } = usePrimaryConditionStore();
  const { handleStepChange } = useStepStore();
  const { secondarySymptoms } = useSecondarySymptomStore();

  // Find the index (zero indexed) of the first element in the 'primaryConditions' array that
  // satisfies the provided 'hasPrimaryCondition' testing function. Previously the '/add/primary'
  // route will have set the 'enabled' property of the selected primary condition to 'true'. And so
  // the 'findIndex' method will return the index of that selected primary condition.
  const selectedPrimaryCondition: number =
    primaryConditions.findIndex(hasPrimaryCondition);

  // The array element (i.e. object) containing details of the secondary symptoms that correspond to
  // the selected primary condition. Since the indexes of the primary conditions match the indexes
  // of the secondary symptoms, we can use the index of the selected primary condition to get the
  // corresponding secondary symptoms.
  const selectedSymptoms = secondarySymptoms[selectedPrimaryCondition];

  // At the bottom of the form the 'Siguente' button has the type 'submit'. On clicking it the form
  // is submitted and the following 'submitForm' function is called.
  const submit = useSubmit();
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Get all checkboxes by name.
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');

    // Iterate over each checkbox and manually add its value to the form data.
    checkboxes.forEach(function (checkbox: Element) {
      const input = checkbox as HTMLInputElement;
      // I deliberately allow the value to be 'selected' or 'unselected' - as this will allow me to
      // determine if the checkbox is checked or not (in the 'convertCheckboxValuesToArray' function).
      formData.append(input.name, input.value);
    });

    // Get all number inputs by name.
    const numbers = form.querySelectorAll('input[type="number"]');

    // Iterate over each value and manually add its key and value to the form data.
    numbers.forEach(function (count: Element) {
      const input = count as HTMLInputElement;
      formData.append(input.name, input.value);
    });

    formData.append(
      "clinicosId",
      KeyToString(useClinicalIDStore.getState().clinicosID)
    );
    formData.append(
      "visitationId",
      KeyToString(useVisitationIDStore.getState().visitationID)
    );

    submit(formData, {
      method: "POST",
      action: `/add/define/alpha`,
    });
  }

  return (
    <main className="max-w-7xl mx-auto mt-12 py-4">
      <Form onSubmit={submitForm}>
        <Define
          selectedPrimaryCondition={selectedPrimaryCondition}
          selectedSymptoms={selectedSymptoms}
        />
        <div className="flex items-center justify-end gap-x-6 border-t-2 border-accent px-4 py-4 sm:px-8 mt-12">
          <Link
            to="/add/primary"
            onClick={() => handleStepChange("02")}
            className="btn btn-secondary btn-sm"
          >
            Previo
          </Link>
          {selectedSymptoms?.checked.every(anySelected) ? (
            <button className="btn btn-sm" disabled>
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => handleStepChange("04")}
              className="btn btn-primary btn-sm"
            >
              Siguiente
            </button>
          )}
        </div>
      </Form>
    </main>
  );
}

// Runs on the server only.
// If a non-GET request is made to the route, this action function is called before
// any loader functions (if any).
export async function action({ request }: ActionFunctionArgs) {
  const body = await request.text();
  const formData = new URLSearchParams(body);

  // 'newSecondaryConditions' will be an object where the items are:
  // (1) most keys will be the 'name' attribute of the checkboxes from 'DefineCondition.tsx'.
  //     Thus the keys will be a concatenation of 'additional' array and the 'additional_details' array.
  //     Both of these coming from the 'selectedSymptoms' object from the 'AppProps' object.
  //     The values will be either 'selected' or 'unselected'.
  // (2) the 'clinicosId' key. This is a unique identifier for the clinical record.
  const newSecondaryConditions = Object.fromEntries(
    formData
  ) as unknown as NewSecondaryCondition;

  console.log(
    "...define.tsx action newSecondaryConditions",
    newSecondaryConditions
  );

  const {
    clinicosId,
    visitationId,
    evacuaciones,
    vomitos,
    ...secondaryConditionsArr
  } = newSecondaryConditions;

  let evacuacionesValue = 0;
  if (newSecondaryConditions.evacuaciones) {
    evacuacionesValue = parseFloat(newSecondaryConditions.evacuaciones);
    await updateEvacuation(visitationId, evacuacionesValue);
  }

  let vomitosValue = 0;
  if (newSecondaryConditions.vomitos) {
    vomitosValue = parseFloat(newSecondaryConditions.vomitos);
    await updateVomitos(visitationId, vomitosValue);
  }

  // This allows the user to use the back button from the 'revise' page to return to
  // the 'define' page and make changes to the secondary conditions. If the user does
  // this then the existing secondary conditions will be retrieved from the database
  // and used to update the newly added secondary conditions.
  const exisitingSecondaryConditions: { secondaryConditions: string[] } | null =
    await getSecondaryConditions(visitationId);

  // Always start with an empty array of secondary conditions.
  let arraySecondaryConditions: string[] = [];

  // Review each newly added secondary condition against the existing secondary conditions.
  if (exisitingSecondaryConditions) {
    if (exisitingSecondaryConditions.secondaryConditions.length > 0) {
      arraySecondaryConditions = convertCheckboxValuesToArray(
        secondaryConditionsArr,
        exisitingSecondaryConditions.secondaryConditions
      );
    } else {
      arraySecondaryConditions = convertCheckboxValuesToArray(
        secondaryConditionsArr,
        []
      );
    }
  }

  console.log(
    "...define.tsx action arraySecondaryConditions",
    arraySecondaryConditions
  );

  // Add the new secondary conditions to the database.
  await updateSecondaryCondition(visitationId, arraySecondaryConditions);

  return redirect(`/add/revise?vID=${visitationId}&cID=${clinicosId}`);
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
      routetext="_app.add._new.define.alpha.tsx"
      className="col-start-1 col-span-12 my-3 pt-1 pb-2 px-2 rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
    />
  );
}
