import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { useSecondarySymptomStore } from "~/state/store";
import { SSDropDown } from "~/utilities/types";

const animatedComponents = makeAnimated();

type SecondarySymptom = {
  id: string;
  primary: string;
  additional: string[];
  additional_details: string[];
  checked: boolean[];
};

export const carrot = (
  primaryId: number,
  trueSecondaryIds: readonly {
    id: number;
    value: string;
    label: string;
  }[],
  lastAactionType: ActionMeta<{
    id: number;
    value: string;
    label: string;
  }>,
  secondarySymptoms: SecondarySymptom[],
  setSecondarySymptoms: (secondarySymptoms: SecondarySymptom[]) => void
) => {
  const updatedSecondarySymptoms = secondarySymptoms.map(
    (secSympt: SecondarySymptom, id: number) => {
      if (id === primaryId) {
        const newItem = { ...secSympt };

        trueSecondaryIds.forEach((obj) => {
          newItem.checked[obj.id] = true;
        });

        if (lastAactionType.action === "remove-value") {
          newItem.checked[lastAactionType.removedValue.id] = false;
        }

        return { ...newItem };
      } else {
        return { ...secSympt };
      }
    }
  );

  setSecondarySymptoms(updatedSecondarySymptoms);
};

const SelectSecondaries = (
  sexo_al_nacer: string | null,
  name: string,
  text: string,
  MainPrimary: SSDropDown,
  handleITSClickID: number,
  sanStart: string,
  sanEnd: string
) => {
  const { secondarySymptoms, setSecondarySymptoms } =
    useSecondarySymptomStore();

  if (!MainPrimary) return null;

  return (
    <div
      className={`md:col-span-6 lg:col-span-3 ${
        sexo_al_nacer === "Hombre" ? sanStart : sanEnd
      }`}
    >
      {text}
      <Select
        name={name}
        classNames={{
          control: (state) => (state.isFocused ? "bg-base-100" : "bg-base-300")
        }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={MainPrimary.availableSecondarySymptoms}
        defaultValue={
          MainPrimary.initialOptions || "Seleccione los síntomas asociados ..."
        }
        placeholder="Seleccione los síntomas asociados ..."
        noOptionsMessage={() => "No hay más opciones."}
        // The elements of array 'e.id' will be the indexes of all the secondary symptom that
        // have been selected (whether just now or previously). Thus in function 'handleITSClick'
        // their corresponding 'checked' array elements are set to 'true'.
        // Any 'actionType.action' that equals 'remove-value' means that item has just been
        // deselected. The corresponding id in the 'checked' array is held in
        // 'actionType.removedValue.id' and is now set to 'false'.
        onChange={(
          e: ReadonlyArray<{
            id: number;
            value: string;
            label: string;
          }>,
          actionType: ActionMeta<{
            id: number;
            value: string;
            label: string;
          }>
        ) =>
          carrot(
            handleITSClickID,
            e,
            actionType,
            secondarySymptoms,
            setSecondarySymptoms
          )
        }
      />
    </div>
  );
};

export default SelectSecondaries;
