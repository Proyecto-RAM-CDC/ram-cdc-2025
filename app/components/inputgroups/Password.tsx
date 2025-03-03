import { useId } from "react";
import LockClosedIcon from "~/icons/lock_closed";

interface InputPasswordProps {
  label: string;
  required: boolean;
}

const InputPassword: React.FC<InputPasswordProps> = ({ label, required }) => {
  const inputId = useId();

  return (
    <div className="my-4">
      <label
        htmlFor={inputId}
        className="block text-left text-sm font-medium leading-6"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          type="password"
          name="password"
          id={inputId}
          minLength={7}
          className="input input-bordered input-info text-neutral w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 pl-10"
          required={required}
        />
      </div>
    </div>
  );
};

export default InputPassword;
