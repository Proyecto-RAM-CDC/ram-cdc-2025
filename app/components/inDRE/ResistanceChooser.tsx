import { Resistance } from "@prisma/client";

interface ResistanceSearchProps {
  selectedResistance: string[];
  setSelectedResistance: (value: string[]) => void;
  list_of_resistance_objs: Resistance[] | null | undefined;
}

const ResistanceSearch: React.FC<ResistanceSearchProps> = (props) => {
  const handleResistanceSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    // Check that each selected option is in the list of resistance objects.
    const allOptionsValid = selectedOptions.every((option) =>
      props.list_of_resistance_objs?.some(
        (resistance) => resistance.resistanceMechanism === option
      )
    );

    if (allOptionsValid) {
      props.setSelectedResistance(selectedOptions);
    }
  };

  return (
    <div
      className="col-start-1 col-span-12 border-2 border-dashed border-primary-content rounded-md p-1 pb-2 pl-2 pr-2"
      id="resistanceSelecting"
    >
      <label
        htmlFor="resistanceSelector"
        className="block text-xs sm:text-sm font-medium leading-6 text-primary-content"
      >
        Nombre del Mecanismo de Resistencia
      </label>
      <select
        id="resistanceSelector"
        name="resistanceSelector"
        data-testid="resistance-select"
        multiple
        defaultValue={props.selectedResistance}
        onChange={handleResistanceSelectionChange}
        className="md:mt-1 input input-bordered input-info rounded-md w-full h-28 py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
      >
        {props.list_of_resistance_objs
          ? props.list_of_resistance_objs.map((res) => (
              <option key={res.id}>{res.resistanceMechanism}</option>
            ))
          : null}
      </select>
    </div>
  );
};

export default ResistanceSearch;
