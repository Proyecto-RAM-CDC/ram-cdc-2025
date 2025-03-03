interface IProps {
  curp: string;
  email: string;
  date: string;
}
const PatientNotFound = ({ curp, email, date }: IProps) => {
  return (
    <div className="justify-center items-center mx-auto mt-4 mb-8 w-fit p-4 h-auto border-4">
      <h1 className="text-red-600 font-semibold underline text-xl pb-4 text-center">
        Paciente no encontrado(a)
      </h1>
      <ul>
        <li>CURP: &quot;{curp}&quot;</li>
        <li>Correo electrónico: &quot;{email}&quot;</li>
        <li>Fecha de nacimiento: &quot;{date}&quot;</li>
      </ul>
      <h2 className="pt-2 font-semibold text-center">Inténtalo de nuevo.</h2>
    </div>
  );
};

export default PatientNotFound;
