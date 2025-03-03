import React, { useState, useRef, useEffect, RefObject } from "react";
import { Bacteria } from "@prisma/client";

interface IProps {
  handleBacteriaSelection: (value: string) => void;
  availableBacteria: Bacteria[];
  selectedBacteria: string;
  setSelectedBacteria: (value: string) => void;
  filteredBacteria: Bacteria[];
  setFilteredBacteria: (value: Bacteria[]) => void;
  removeSelectedBacteria: () => void;
}

const BacteriaSearch: React.FC<IProps> = (props) => {
  // State that controls whether the dropdown is shown or hidden to 'false'.
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Initialize the input value (the value shown in the input box) to an empty string.
  const [inputValue, setInputValue] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // This function is mapped to the 'onChange' of the input box.
  // It is called every time the user types into the input box.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the value of the input box.
    const value = e.target.value;

    // Show dropdown when typing.
    setShowDropdown(true);

    if (value === "") {
      setShowDropdown(false);
    }

    // Update the input value (the value shown in the input box) as the user types.
    setInputValue(value);

    // Filter the list of bacteria based on the query.
    // Always start with the full listing from the database, and filter it down based on the query.
    const query = value.toLowerCase();

    props.setFilteredBacteria(
      props.availableBacteria.filter((bacteria) =>
        bacteria.bacteria.toLowerCase().includes(query)
      )
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Choose one bacteria family at a time because it's then easier to identify any
  // antibiotic resistance and gene family associated with that bacteria.
  useEffect(() => {
    if (props.selectedBacteria) {
      setInputValue("");
      setShowDropdown(false);
    }
  }, [props.selectedBacteria]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      ref={dropdownRef}
      className="col-start-1 col-span-12 flex flex-col gap-0 md:gap-1 border-2 border-dashed border-primary-content rounded-md p-1 pb-2 pl-2 pr-2"
    >
      <div className="block text-xs w-full sm:text-sm font-medium leading-6 text-primary-content">
        Nombre de la Bacteria o Familia de Bacterias
      </div>

      <div className="flex flex-col md:flex-row gap-1 md:gap-4">
        <div className="w-full md:w-7/12">
          <input
            list="bacteriaList"
            id="bacteriaSearch"
            name="bacteriaSearch"
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            onClick={toggleDropdown}
            disabled={props.selectedBacteria == "" ? false : true}
            placeholder="Escribe para buscar por bacteria..."
            data-testid="bacteria-input"
            className="input input-bordered input-info rounded-md w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
          />

          {showDropdown && props.filteredBacteria.length > 0 && (
            <ul
              className="absolute z-10 bg-white border border-gray-300 rounded-md w-4/12 mt-1 max-h-60 overflow-y-auto text-xs sm:text-sm"
              data-testid="bacteria-dropdown"
            >
              {props.filteredBacteria.map((bacteria) => (
                <li key={bacteria.id} className="p-2">
                  <button
                    type="button"
                    onClick={() =>
                      props.handleBacteriaSelection(bacteria.bacteria)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        props.handleBacteriaSelection(bacteria.bacteria);
                      }
                    }}
                    className="w-full text-left cursor-pointer hover:bg-gray-100"
                    data-testid={`bacteria-option-${bacteria.id}`}
                  >
                    {bacteria.bacteria}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-full md:w-6/12 h-32">
          <div className="flex flex-wrap gap-2">
            {props.selectedBacteria && (
              <div
                key={props.selectedBacteria}
                data-bacteria={props.selectedBacteria}
                className="selected-bacteria flex items-center bg-gray-200 rounded px-2 py-1 text-xs sm:text-sm"
                data-testid="selected-bacteria"
              >
                <span className="mr-2">{props.selectedBacteria}</span>
                <button
                  type="button"
                  className="text-red-500 font-extrabold"
                  onClick={() => props.removeSelectedBacteria()}
                  data-testid="deselect-bacteria"
                >
                  x
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacteriaSearch;
