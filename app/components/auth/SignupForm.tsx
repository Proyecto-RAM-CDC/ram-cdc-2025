import React from "react";
import InputName from "~/components/inputgroups/Name";
import InputEmail from "~/components/inputgroups/Email";
import InputPassword from "~/components/inputgroups/Password";
import InputLicense from "~/components/inputgroups/MedicalLicense";
import InputState from "~/components/inputgroups/State";

const SignupForm: React.FC = () => {
  return (
    <div className="mx-8 text-secondary-content">
      <InputName label="*Nombre" name="nombre" required={true} />
      <InputName
        label="*Apellido paterno"
        name="apellidoPaterno"
        required={true}
      />
      <InputName
        label="Apellido materno (opcional)"
        name="apellidoMaterno"
        required={false}
      />
      <InputLicense
        label="*Cédula profesional"
        name="license"
        required={true}
      />
      <InputName
        label="*Institución primaria de trabajo (nombre)"
        name="institution"
        required={true}
      />
      <InputState
        label="*Institución primaria de trabajo (estado)"
        name="whichEstado"
        required={true}
      />
      <InputEmail
        label="*Correo electrónico"
        placeholder="usted@ejemplo.com"
        required={true}
      />
      <InputPassword label="*Contraseña" required={true} />
    </div>
  );
};

export default SignupForm;
