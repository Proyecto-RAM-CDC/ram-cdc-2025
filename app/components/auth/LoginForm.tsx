// app/components/auth/LoginForm.tsx
import React from "react";
import MapIcon from "~/icons/map";
import InputEmail from "~/components/inputgroups/Email";
import InputPassword from "~/components/inputgroups/Password";
import { list_of_mexican_states } from "~/utilities/states";

const LoginForm: React.FC = () => {
  return (
    <div className="mx-8 text-secondary-content">
      <InputEmail
        label="Correo electrónico"
        placeholder="usted@ejemplo.com"
        required={true}
      />
      <InputPassword label="Contraseña" required={true} />
      <label
        htmlFor="whichEstado"
        className="block text-left text-sm font-medium leading-6"
      >
        ¿Desde cual estado se esta conectando para esta sesión?
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MapIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <select
          id="whichEstado"
          name="whichEstado"
          required
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

export default LoginForm;
