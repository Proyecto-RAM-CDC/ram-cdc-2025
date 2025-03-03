import React from "react";
import InputEmail from "~/components/inputgroups/Email";

const ForgotPasswordForm: React.FC = () => {
  return (
    <div className="mx-8 text-secondary-content">
      <h2 className="text-2xl mb-4">Restablecer su contraseña</h2>
      <InputEmail
        label="Correo electrónico"
        placeholder="usted@ejemplo.com"
        required={true}
      />
    </div>
  );
};

export default ForgotPasswordForm;
