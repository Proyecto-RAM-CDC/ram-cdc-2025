import React, { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import {
  NewClinico,
  ExistingClinico,
} from "~/components/inputgroups/ClinicoAvatarCard";
import {
  useClinicalIDStore,
  useContactoIDStore,
  useOcupacionIDStore,
  useOtrosIDStore,
  useVisitationIDStore,
} from "~/state/store";
import LoaderAnimation from "~/utilities/LoaderAnimation";

type SelectedObj = {
  curp: string;
  dob: Date;
  sexonacer: string;
  dateAdded: Date;
  contactoId: string;
  otrosId: string;
  ocupacionId: string;
  visitationId: string;
  id: string;
};

type Selected = { selected: SelectedObj };

const CurpSearch: React.FC = () => {
  // A hook for interacting with the server outside of navigation.
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [clinicosList, setClinicosList] = useState<string[]>([]);
  const [curpSearch, setCurpSearch] = useState<string>("");
  const [finalSelection, setFinalSelection] = useState<string>("");
  const [finalClinicos, setFinalClinicos] = useState<Selected | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [newPatient, setNewPatient] = useState<boolean>(false);
  const [curpError, setCurpError] = useState<string>("");

  const { setClinicalID } = useClinicalIDStore();
  const { setContactoID } = useContactoIDStore();
  const { setOtrosID } = useOtrosIDStore();
  const { setOcupacionID } = useOcupacionIDStore();
  const { setVisitationID } = useVisitationIDStore();

  // As the user types into the 'curpSearch' input field, the 'handleSearchChange'
  // function is called. This function uses 'fetcher.load' to fetch data from
  // the server based on the user's input.
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    if (curpError) {
      setCurpError("");
      setNewPatient(false);
    }

    const { value } = e.target;
    setCurpSearch(value);
    fetcher.load(`/add/characteristics?curp=${encodeURIComponent(value)}`);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Selection in this context can either mean the user has clicked to select
    // a value from the list of filtered CURP values, or they have entered a correct
    // CURP value with the keyboard.
    const { value } = e.target;

    // Check if the selected value is in the filtered list
    const isFinalSelection: boolean = clinicosList.some(
      (item) => item === value
    );

    if (isFinalSelection) {
      setFinalSelection(value);
      fetcher.submit(`/add/characteristics?curp=${encodeURIComponent(value)}`, {
        method: "POST",
      });
    } else {
      if (value.length === 18) {
        setNewPatient(true);
      } else {
        setNewPatient(false);
      }
    }
  };

  const handleCancel = () => {
    setClinicosList([]); // Clear filtered list
    setCurpSearch(""); // Clear search value
    setFinalSelection(""); // Clear final selection
    setFinalClinicos(null); // Reset patient data
    setLoading(false); // Clear loading state
    setInputValue(""); // Clear input field value
    setNewPatient(false); // Reset new patient state
  };

  // The 'useEffect' hook listens for changes to 'fetcher.data'.
  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object") {
      if ("curpList" in fetcher.data) {
        const data = fetcher.data as { curpList: string[] };
        setClinicosList(data.curpList);
      } else if ("selected" in fetcher.data) {
        setLoading(false); // Clear loading state.
        const data = fetcher.data as Selected;
        setFinalClinicos(data);
      } else if ("error" in fetcher.data) {
        setLoading(false); // Clear loading state.
        setCurpError(fetcher.data.error as string);
      }
    }
  }, [fetcher.data]);

  const filteredCurpList = clinicosList.filter((cco) =>
    cco.toLowerCase().includes(curpSearch.toLowerCase())
  );

  const handleContinue = () => {
    const targetCurp = finalClinicos?.selected.curp;
    if (targetCurp) {
      setClinicalID(finalClinicos?.selected.id);
      setContactoID(finalClinicos?.selected.contactoId);
      setOtrosID(finalClinicos?.selected.otrosId);
      setOcupacionID(finalClinicos?.selected.ocupacionId);
      setVisitationID(finalClinicos?.selected.visitationId);
      navigate(
        `/add/characteristics/create?curp=${encodeURIComponent(targetCurp)}`
      );
    } else {
      navigate("/add/characteristics/create");
    }
  };

  const handleCheckCurp = () => {
    fetcher.load(
      `/add/characteristics?curp=${encodeURIComponent(curpSearch)}&fCh=${true}`
    );
  };

  return (
    <div className="border-2 border-dashed border-primary-content rounded-md p-4 mt-5 md:mt-10 lg:mt-20 mb-4">
      <h1 className="text-center font-semibold text-xl sm:text-3xl">
        Para comenzar busque la CURP del paciente
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 items-center mt-6">
        {/* Input Field on Left */}
        <div className="relative flex justify-center col-span-1 md:col-span-5">
          <input
            list="curpList"
            id="curpSearch"
            name="curpSearch"
            type="text"
            value={inputValue}
            onInput={(e) => {
              handleInput(e as React.ChangeEvent<HTMLInputElement>);
              setInputValue((e.target as HTMLInputElement).value);
            }}
            onChange={handleSelection}
            placeholder="Escribe para buscar por CURP..."
            className="input input-bordered input-info rounded-md w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
          />
          <datalist id="curpList">
            {filteredCurpList.length === 0 ? (
              <option value="" disabled>
                Escribe para buscar por CLUES...
              </option>
            ) : (
              filteredCurpList.map((cco) => (
                <option key={cco} value={cco}>
                  {cco}
                </option>
              ))
            )}
          </datalist>
        </div>

        {/* Loader in the Center */}
        <div className="flex justify-center items-center col-span-1 md:col-span-1 min-h-[50px]">
          {loading && <LoaderAnimation />}
        </div>

        {/* Clinico Display on Right */}
        <div
          className={`flex justify-center col-span-1 md:col-span-6 items-center ${
            finalSelection.length === 0 && !newPatient
              ? "bg-[url(../icons/ClinicoPlaceholderAvatar.svg)] h-96 bg-contain bg-no-repeat bg-center"
              : ""
          }`}
        >
          {finalSelection.length !== 0 ? (
            <ExistingClinico
              finalClinicos={finalClinicos}
              handleCancel={handleCancel}
              handleContinue={handleContinue}
            />
          ) : null}
          {newPatient ? (
            <NewClinico
              curpError={curpError}
              handleCheckCurp={handleCheckCurp}
              handleCancel={handleCancel}
              newCurp={curpSearch}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CurpSearch;
