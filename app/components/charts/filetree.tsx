// "app/components/charts/filetree.tsx".
// A UI component that renders a file tree from which states of Mexico can be selected.
import { useState } from "react";
import { State } from "~/utilities/types";
import LoaderAnimation from "~/utilities/LoaderAnimation";

type IProps = {
  cssClasses: string;
  stateList: State[];
  geoJson: any;
  setGeoJson: any;
  loadingState: boolean;
};

const FileTree: React.FC<IProps> = (props) => {
  // Sort the stateList alphabetically by stateName
  const sortedStateList = [...props.stateList].sort((a, b) =>
    a.stateName.localeCompare(b.stateName)
  );

  const [prevValue, setPrevValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the value of the input box.
    const value = e.target.value;
    if (value !== prevValue) {
      setPrevValue(value);
      props.setGeoJson(value);
      e.target.value = ""; // Clear the input field after selection.
    }
  };

  return (
    <ul className={`${props.cssClasses}`}>
      <label
        htmlFor="stateSearch"
        className="block text-xs sm:text-sm lg:text-base font-semibold leading-6 mb-2"
      >
        Nivel estatal
      </label>
      <input
        list="statesList"
        id="stateSearch"
        name="stateSearch"
        type="text"
        onChange={handleSearchChange}
        placeholder="Comience a escribir para elegir un estado..."
        className="input input-bordered input-info rounded-md w-full py-1.5 shadow-sm text-xs sm:text-xs sm:leading-6 font-medium"
      />
      <datalist id="statesList">
        {sortedStateList.length === 0 ? (
          <option value="" disabled>
            Comience a escribir para elegir un estado...
          </option>
        ) : (
          sortedStateList.map((sta) => (
            <option key={sta.id} value={sta.stateName}>
              {sta.stateName}
            </option>
          ))
        )}
      </datalist>
      {props.geoJson && (
        <li className="text-xs sm:text-sm font-medium leading-6 mt-3">
          Estado seleccionado: {props.geoJson}
        </li>
      )}
      <button
        className="btn btn-primary mt-6"
        onClick={() => props.setGeoJson(null)}
        disabled={!props.geoJson}
      >
        Limpiar selección
      </button>
      {props.loadingState && (
        <div className="h-[400px] overflow-y-auto border-2 border-dashed border-primary-content rounded-md p-3">
          <div className="flex items-center justify-center h-full">
            <LoaderAnimation />
          </div>
        </div>
      )}
    </ul>
  );
};

export default FileTree;
