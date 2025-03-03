const DisplayTreatmentSintomatico = (syndrome: string, allergies: string[]) => {
  const isAllergicToPenicillin = allergies.some(
    (x: string) => x === "Penicilinas"
  );
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento sintomático para {syndrome}
        </h3>
      </div>
      <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
        <h3 className="text-lg font-semibold leading-7 text-primary">
          Recomendaciones y Notas Adicionales
        </h3>
        {allergies.length > 0 ? (
          <ul className="list-disc list-outside text-sm leading-6 pl-6 text-secondary">
            {isAllergicToPenicillin && (
              <li>
                Alergia a la familia de antibióticos de las Penicilinas
                (Amoxicilina, Ampicilina).
              </li>
            )}
          </ul>
        ) : syndrome === "Neumonia" ? (
          <p className="text-sm leading-6 pl-6 text-secondary">
            Realizar pruebas para detectar virus de influenza (durante temporada
            de influenza o brotes) y/o SARS CoV2.
          </p>
        ) : (
          <p className="text-sm leading-6 pl-6 text-secondary">Ninguno.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayTreatmentSintomatico;
