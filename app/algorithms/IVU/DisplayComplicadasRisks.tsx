// File: DisplayComplicadasRisks.tsx
// Path: app/algorithms/IVU/DisplayComplicadasRisks.tsx
// Objective: Display the risk factors for IVU and the recommendations for complicated cases.

export const DisplayRiskFactors: React.FC<{
  hasTakenMedication: boolean;
  wasHospitalized: boolean;
  hasInfectionHistory: boolean;
}> = (props) => {
  return (
    <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
      <h3 className="text-lg font-semibold leading-7 text-primary">
        Factores de riesgo de resistencia antibiótica que presenta el paciente
      </h3>
      <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
        {props.hasTakenMedication && (
          <li>Uso de antibióticos en los tres meses previos.</li>
        )}
        {props.wasHospitalized && (
          <li>Hospitalización en tres meses previos.</li>
        )}
        {props.hasInfectionHistory && (
          <li>Antecedente de infecciones de vías urinarias de repetición.</li>
        )}
      </ul>
    </div>
  );
};

export const DisplayComplicadas: React.FC<{
  hasDiabetes: boolean;
  isImmunosuppressed: boolean;
  isPosmenopausica: boolean;
  isEmbarazada: boolean;
  hasAlterationAnatomica: boolean;
  wasHospitalized: boolean;
}> = (props) => {
  return (
    <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
      <h3 className="text-lg font-semibold leading-7 text-primary">
        Siempre pregunte/considere los siguientes factores de riesgo
      </h3>
      <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
        {props.hasDiabetes && <li>Diabetes.</li>}
        {props.isImmunosuppressed && <li>Inmunosupresión.</li>}
        {props.isPosmenopausica && <li>Mujer postmenopáusica.</li>}
        {props.isEmbarazada && <li>Embarazo actual.</li>}
        {props.hasAlterationAnatomica && (
          <li>
            Alteración anatómica o funcional de la vía urinaria (megaureter,
            cistocele, ureter ectópico, lesiones medulares).
          </li>
        )}
        {props.wasHospitalized && (
          <li>Hospitalización en tres meses previos.</li>
        )}
        <li>Infección de vías urinarias complicada.</li>
        <li>
          No cambia el tratamiento, pero el paciente debe vigilarse por mayor
          riesgo de complicaciones.
        </li>
      </ul>
    </div>
  );
};
