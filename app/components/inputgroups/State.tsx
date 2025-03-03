import { useId } from "react";
import MapIcon from "~/icons/map";
import { list_of_mexican_states } from "~/utilities/states";

interface InputStateProps {
  label: string;
  name: string;
  required: boolean;
}

const InputState: React.FC<InputStateProps> = ({ label, name, required }) => {
  const inputId = useId();

  return (
    <div className="my-4">
      <label
        htmlFor={inputId}
        className="block text-sm text-left font-medium leading-6"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MapIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <select
          id={inputId}
          name={name}
          required={required}
          className="input input-bordered input-info text-neutral w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 pl-10"
        >
          {list_of_mexican_states.map((estado) => (
            <option key={estado}>{estado}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputState;
