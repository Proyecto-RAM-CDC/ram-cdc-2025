// File: PatientCard.ts
// Path: app/algorithms/PatientCard.tsx
// Objective: Display a patient card with the patient's clinical data.

import { typePropsReportCard } from "~/algorithms/utilitiesTypes";

const PatientCard: React.FC<typePropsReportCard> = ({ data }) => {
  return (
    <div
      id="patientCard"
      className="mt-2 mb-8 py-4 px-2 border border-primary bg-base-200 rounded-md shadow-md"
    >
      <div className="px-4 sm:px-0 py-2">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Resumen del Paciente
        </h3>
      </div>
      <div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <div
            id="fecha-nacimiento"
            className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0"
          >
            <dt className="text-sm font-medium leading-6 text-secondary">
              Fecha de nacimiento (edad)
            </dt>
            <dd className="text-sm leading-6 text-accent">
              {data.dob.substring(0, 10)} ({data.age.years} años,{" "}
              {data.age.months} meses, {data.age.days} días)
            </dd>
          </div>
          <div
            id="sexo-presentados"
            className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0"
          >
            <dt className="text-sm font-medium leading-6 text-secondary">
              Sexo al nacer
            </dt>
            <dd className="text-sm leading-6 text-accent">
              {data.sexonacer} {data.postmenopausia ? " (Post menopausia)" : ""}
            </dd>
          </div>
          <div
            id="genero-presentados"
            className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0"
          >
            <dt className="text-sm font-medium leading-6 text-secondary">
              Identidad de género
            </dt>
            <dd className="text-sm leading-6 text-accent">{data.genero}</dd>
          </div>
          <div
            id="primary-presentados"
            className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0"
          >
            <dt className="text-sm font-medium leading-6 text-secondary">
              Condición primaria
            </dt>
            <dd className="text-sm leading-6 text-accent">
              {data.primaryConditions[0]}
            </dd>
          </div>

          <div
            id="sintomas-presentados"
            className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0"
          >
            {data.symptoms.length > 0 ? (
              <>
                <dt className="text-sm font-medium leading-6 text-secondary">
                  Síntomas presentados
                </dt>
                {data.symptoms.map((symptom, i) => (
                  <dd key={i} className="text-sm leading-6 text-accent">
                    {symptom}{" "}
                    {symptom.includes("Diarrea")
                      ? ` (${data.evacuationCount} evacuaciones en las últimas 24 horas)`
                      : ""}
                    {symptom.includes("Vómito")
                      ? ` (${data.vomitCount} aparición de vómitos en las últimas 24 horas)`
                      : ""}
                  </dd>
                ))}
              </>
            ) : (
              <dt className="text-sm font-medium leading-6 text-secondary">
                <span className="underline">No</span> síntomas presentados
              </dt>
            )}
          </div>

          <div
            id="allergies-presentados"
            className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0"
          >
            {data.allergies.length > 0 ? (
              <>
                <dt className="text-sm font-medium leading-6 text-secondary">
                  Alergias presentadas
                </dt>
                {data.allergies.map((allergy, i) => (
                  <dd key={i} className="text-sm leading-6 text-accent">
                    {allergy}
                  </dd>
                ))}
              </>
            ) : (
              <dt className="text-sm font-medium leading-6 text-secondary">
                <span className="underline">No</span> alergias presentadas
              </dt>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PatientCard;
