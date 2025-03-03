import { useId } from "react";

interface InputLicenseProps {
  label: string;
  name: string;
  required: boolean;
}

const InputLicense: React.FC<InputLicenseProps> = ({
  label,
  name,
  required
}) => {
  const inputId = useId();

  return (
    <div className="my-4">
      <label
        htmlFor={inputId}
        className="block text-left text-sm font-medium leading-6"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={name}
          id={inputId}
          className="input input-bordered text-neutral w-full py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6"
          required={required}
        />
      </div>
    </div>
  );
};

export default InputLicense;
