import React, { useState } from "react";
import BacteriaSearch from "~/components/inDRE/BacteriaChooser";
import HospitalSearch from "~/components/inDRE/HospitalChooser";
import GeneSearch from "~/components/inDRE/GeneChooser";
import ResistanceSearch from "~/components/inDRE/ResistanceChooser";
import AntiMicrobianoChooser from "~/components/inDRE/AntiMicrobianoChooser";

import { Gene, Bacteria, Resistance } from "@prisma/client";

interface ActionData {
  error?: Record<string, string>;
  validation_error?: boolean;
}

interface IProps {
  isSubmitting: boolean;
  selectedBacteria: string;
  setSelectedBacteria: (value: string) => void;
  selectedResistance: string[];
  setSelectedResistance: (value: string[]) => void;
  selectedGene: string[];
  setSelectedGene: (value: string[]) => void;
  actionReturned?: ActionData | null;
  list_of_resistance_objs: Resistance[];
  list_of_genes_objs: Gene[];
  all_possible_bacteria_objs: Bacteria[];
  handleButtonClick: (value: string) => void;
  actionValue?: string;
}

const SubmitButton = (props: IProps) => {
  return (
    <div className="col-start-1 col-span-12">
      <div className="flex flex-col sm:flex-row justify-start grid-cols-12">
        <button
          type="submit"
          onClick={() => props.handleButtonClick("addingindre")}
          disabled={props.isSubmitting}
          className="col-start-1 col-span-12 mt-1 sm:mt-3 md:mt-1 btn btn-secondary text-secondary-content btn-sm py-2 px-4"
        >
          {props.isSubmitting &&
          props.actionValue !== "updatingindre" &&
          props.actionValue !== ""
            ? "Autenticando ..."
            : "Entregar"}
        </button>
        <>
          {props.actionReturned &&
            props.actionReturned.validation_error &&
            props.actionReturned.error && (
              <div className="whitespace-pre-wrap col-start-1 col-span-12 bg-red-700 border-2 border-red-500 mt-1 sm:mt-0 px-4 rounded-md mx-auto">
                <ul className="mt-2 text-white font-bold">
                  {Object.values(props.actionReturned.error).map((error) => (
                    <li className="my-2 text-xs lg:text-sm" key={error}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </>
      </div>
    </div>
  );
};

const Agregar: React.FC<IProps> = (props) => {
  // Initialize the state that holds the list of available bacteria to all possible bacteria.
  const [availableBacteria, setAvailableBacteria] = useState<Bacteria[]>(
    props.all_possible_bacteria_objs
  );

  // State that holds the filtered bacteria to all possible bacteria.
  // This listing of bacteria are shown in the dropdown and so can change as the
  // user types into the input box (with CSS id "bacteriaSearch").
  const [filteredBacteria, setFilteredBacteria] = useState<Bacteria[]>(
    props.all_possible_bacteria_objs
  );

  // This function is called when the user clicks to select a bacteria from the dropdown.
  const handleBacteriaSelection = (value: string) => {
    const isValidSelection = props.all_possible_bacteria_objs.some(
      (bacteria) => bacteria.bacteria.toLowerCase() === value.toLowerCase()
    );

    if (isValidSelection) {
      // Assuming the selection is valid, update the filtered list to show only the
      // available bacteria. Thus, keep the existing selection minus the selected bacteria.
      setAvailableBacteria((prev) => {
        const updatedAvailableBacteria = prev.filter(
          (bacteria) => bacteria.bacteria.toLowerCase() !== value.toLowerCase()
        );
        setFilteredBacteria(updatedAvailableBacteria);
        return updatedAvailableBacteria;
      });
      props.setSelectedBacteria(value);
    }
  };

  const removeSelectedBacteria = () => {
    if (props.selectedBacteria) {
      props.setSelectedBacteria("");
      setAvailableBacteria(props.all_possible_bacteria_objs);
      setFilteredBacteria(props.all_possible_bacteria_objs);
    }
  };

  return (
    <div className="grid grid-cols-12 items-start gap-2 sm:gap-4">
      <h1 className="col-start-1 col-span-9 text-lg sm:text-xl md:text-2xl text-primary-content font-bold md:mb-2">
        Agregar Registro
      </h1>

      <BacteriaSearch
        handleBacteriaSelection={handleBacteriaSelection}
        availableBacteria={availableBacteria}
        selectedBacteria={props.selectedBacteria}
        setSelectedBacteria={props.setSelectedBacteria}
        filteredBacteria={filteredBacteria}
        setFilteredBacteria={setFilteredBacteria}
        removeSelectedBacteria={removeSelectedBacteria}
      />

      {props.selectedBacteria !== "" && (
        <AntiMicrobianoChooser selectedBacteria={props.selectedBacteria} />
      )}

      <ResistanceSearch
        selectedResistance={props.selectedResistance}
        setSelectedResistance={props.setSelectedResistance}
        list_of_resistance_objs={props.list_of_resistance_objs}
      />

      <HospitalSearch />

      <GeneSearch
        selectedGene={props.selectedGene}
        setSelectedGene={props.setSelectedGene}
        list_of_genes_objs={props.list_of_genes_objs}
      />

      {SubmitButton(props)}
    </div>
  );
};

export default Agregar;
