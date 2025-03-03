import React, { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

import { Hospital } from "@prisma/client";

interface FetcherData {
  hospitals: Hospital[];
}

const HospitalSearch: React.FC = () => {
  // A hook for interacting with the server outside of navigation.
  // Just remember you are calling the specific rout '/indre/hospital', rather than '/indre'.
  const fetcher = useFetcher();
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [cluesSearch, setCluesSearch] = useState<string>("");
  const [hospitalNameSearch, setHospitalNameSearch] = useState<string>("");

  // As the user types into the 'cluesSearch' or 'hospitalNameSearch' input fields, the
  // 'handleSearchChange' function is called. This function uses 'fetcher.load' to fetch data from
  // the server based on the user's input.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "cluesSearch") {
      setCluesSearch(value);
      fetcher.load(`/indre/hospital?q=${value}&type=clues`);
    } else if (id === "hospitalNameSearch") {
      setHospitalNameSearch(value);
      fetcher.load(`/indre/hospital?q=${value}&type=hospitalName`);
    }
  };

  // The 'useEffect' hook listens for changes to 'fetcher.data'. When new data is fetched, it
  // updates the 'hospitalList' state with the fetched hospitals.
  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as FetcherData;
      setHospitalList(data.hospitals);
    }
  }, [fetcher.data]);

  const filteredCluesList = hospitalList.filter((hosp) =>
    hosp.clues.toLowerCase().includes(cluesSearch.toLowerCase())
  );

  const filteredHospitalNameList = hospitalList.filter((hosp) =>
    hosp.hospitalName.toLowerCase().includes(hospitalNameSearch.toLowerCase())
  );

  return (
    <div className="col-start-1 col-span-12 flex flex-col gap-0 md:gap-1 border-2 border-dashed border-primary-content rounded-md p-1 pb-2 pl-2 pr-2">
      <div className="block text-xs w-full sm:text-sm font-medium leading-6 text-primary-content">
        Busque el hospital por nombre o CLUES
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-4">
        <div className="w-full md:w-6/12">
          <label
            htmlFor="cluesSearch"
            className="block text-xs sm:text-sm font-medium leading-6 text-primary-content"
          >
            Buscar por CLUES
          </label>
          <input
            list="cluesList"
            id="cluesSearch"
            name="cluesSearch"
            type="text"
            onChange={handleSearchChange}
            disabled={hospitalNameSearch !== "" ? true : false}
            placeholder="Escribe para buscar por CLUES..."
            className="input input-bordered input-info rounded-md w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
          />
          <datalist id="cluesList">
            {filteredCluesList.length === 0 ? (
              <option value="" disabled>
                Escribe para buscar por CLUES...
              </option>
            ) : (
              filteredCluesList.map((hosp) => (
                <option key={hosp.id} value={hosp.clues}>
                  {hosp.clues}
                </option>
              ))
            )}
          </datalist>
        </div>

        <div className="w-full md:w-6/12">
          <label
            htmlFor="hospitalNameSearch"
            className="block text-xs sm:text-sm font-medium leading-6 text-primary-content"
          >
            Buscar por Nombre del Hospital
          </label>
          <input
            list="hospitalNameList"
            id="hospitalNameSearch"
            name="hospitalNameSearch"
            type="text"
            onChange={handleSearchChange}
            disabled={cluesSearch !== "" ? true : false}
            placeholder="Escribe para buscar por nombre..."
            className="input input-bordered input-info rounded-md w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
          />
          <datalist id="hospitalNameList">
            {filteredHospitalNameList.length === 0 ? (
              <option value="" disabled>
                Escribe para buscar por nombre...
              </option>
            ) : (
              filteredHospitalNameList.map((hosp) => (
                <option key={hosp.id} value={hosp.hospitalName}>
                  {hosp.hospitalName}
                </option>
              ))
            )}
          </datalist>
        </div>
      </div>
    </div>
  );
};

export default HospitalSearch;
