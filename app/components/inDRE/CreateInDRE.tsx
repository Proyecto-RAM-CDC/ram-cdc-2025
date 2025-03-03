import React, { useState, useRef, useEffect } from "react";
import {
  SubmitFunction,
  useSubmit,
  Form,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import Agregar from "~/components/inDRE/AgregarRegistro";
import Actualizar from "~/components/inDRE/ActualizarRegistro";
import { InDRELoader } from "~/utilities/InDRETypes";

interface IProps {
  loaderData: InDRELoader;
}

interface ActionData {
  error?: Record<string, string>;
  validation_error?: boolean;
}

const CreateInDRE: React.FC<IProps> = ({ loaderData }) => {
  const { profileId, bacteriaListing, resistanceListing, geneFamilyListing } =
    loaderData;

  const navigation = useNavigation();
  // 'navigation.state': 'idle', 'submitting', 'loading'.
  const isSubmitting = navigation.state !== "idle";

  const actionReturned = useActionData<ActionData | undefined>();

  const [selectedResistance, setSelectedResistance] = useState<string[]>([]);
  const [selectedGene, setSelectedGene] = useState<string[]>([]);
  // Choose one bacteria family at a time because it's then easier to identify any
  // antibiotic resistance and gene family associated with that bacteria.
  const [selectedBacteria, setSelectedBacteria] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSubmitting && !actionReturned?.error) {
      // The form submission has completed and we've returned to the idle state.
      // Clear the form fields.
      if (formRef.current) {
        (formRef.current as HTMLFormElement).reset();
      }
    }
  }, [isSubmitting, actionReturned]);

  const [actionValue, setActionValue] = useState("");

  function handleButtonClick(value: string) {
    setActionValue(value);
  }

  // When you submit a form in HTML, all form elements with a 'name' attribute are included in
  // the form submission. This includes 'input', 'select', 'textarea', and other form elements.
  // The browser automatically collects the values of these elements and sends them as part of the form data.
  const submit: SubmitFunction = useSubmit();
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitThis = new FormData(e.target as HTMLFormElement);

    submitThis.append("profileId", profileId);

    if (actionValue) {
      submitThis.append("action", actionValue);
    }

    // ------------------------------------------------------------
    // Get the selected bacteria from the div element.
    const selectedBacteriaDiv = document.querySelector(".selected-bacteria");
    const selectedBacteria: string = selectedBacteriaDiv
      ? selectedBacteriaDiv.getAttribute("data-bacteria") || ""
      : "";

    submitThis.append("bacteriaSelector", JSON.stringify(selectedBacteria));
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // Get the selected resistance from the named multi-select dropdown.
    // See the 'select' element with 'name' set to 'resistanceSelector' in the form.
    const resistanceSelect: HTMLSelectElement | null = (
      e.target as HTMLFormElement
    ).elements.namedItem("resistanceSelector") as HTMLSelectElement;

    // The definition of '_selectedResistance' here shadows that of 'selectedResistance' in the
    // state hook above. It is named slightly differently to avoid confusion.
    let _selectedResistance: string[] = [];
    if (resistanceSelect !== null) {
      _selectedResistance = Array.from(
        resistanceSelect.selectedOptions,
        (option) => option.value
      );
    }

    submitThis.append(
      "resistanceSelector",
      JSON.stringify(_selectedResistance)
    );
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // Get the selected Gene associated with anti-microbial resistance from the named multi-select dropdown.
    // See the 'select' element with 'name' set to 'geneSelector' in the form below.
    const geneSelect: HTMLSelectElement | null = (
      e.target as HTMLFormElement
    ).elements.namedItem("geneSelector") as HTMLSelectElement;

    // The definition of '_selectedGene' here shadows that of 'selectedGene' in the
    // state hook above. It is named slightly differently to avoid confusion.
    let _selectedGene: string[] = [];
    if (geneSelect !== null) {
      _selectedGene = Array.from(
        geneSelect.selectedOptions,
        (option) => option.value
      );
    }

    submitThis.append("geneSelector", JSON.stringify(_selectedGene));
    // ------------------------------------------------------------

    if (actionValue === "addingindre") {
      submit(submitThis, { method: "POST" });
    } else if (actionValue === "updatingindre") {
      submit(submitThis, { method: "PATCH" });
    }

    // Reset selected values after submission.
    setSelectedResistance([]);
    setSelectedGene([]);
  }

  return (
    <div className="divWithBackground">
      <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full text-lg sm:text-xl md:text-4xl font-bold text-center text-primary mt-1 sm:mt-4 p-4">
        InDRE Agregar Registro
      </h1>
      <div className="absolute top-16 md:top-44 left-0 w-full min-h-screen md:pb-0">
        <Form
          ref={formRef}
          onSubmit={submitForm}
          className="flex flex-col lg:flex-row items-center md:justify-around w-11/12 mx-auto gap-2 lg:gap-4"
        >
          <div className="bg-primary p-3 lg:p-6 rounded-lg shadow-md mb-2 lg:mb-0 w-full md:w-9/12 lg:w-6/12">
            <Agregar
              isSubmitting={isSubmitting}
              selectedBacteria={selectedBacteria}
              setSelectedBacteria={setSelectedBacteria}
              selectedResistance={selectedResistance}
              setSelectedResistance={setSelectedResistance}
              selectedGene={selectedGene}
              setSelectedGene={setSelectedGene}
              actionReturned={actionReturned}
              list_of_resistance_objs={resistanceListing}
              list_of_genes_objs={geneFamilyListing}
              all_possible_bacteria_objs={bacteriaListing}
              handleButtonClick={handleButtonClick}
              actionValue={actionValue}
            />
          </div>
          <div className="bg-secondary p-3 lg:p-6 rounded-lg shadow-md mt-2 lg:mt-0 w-full md:w-9/12 lg:w-6/12">
            <Actualizar
              isSubmitting={isSubmitting}
              actionReturned={actionReturned}
              handleButtonClick={handleButtonClick}
              actionValue={actionValue}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateInDRE;
