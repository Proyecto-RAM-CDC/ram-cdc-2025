// File: DisplayIvuNegativeResult.tsx
// Path: app/algorithms/IVU/DisplayIvuNegativeResult.tsx
// Objective: Display the negative result for IVU and its recommendations.

export const DisplayIvuNegativeResult: React.FC = () => {
  return (
    <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
      <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
        No requiere tratamiento antibiótico
      </h3>
    </div>
  );
};

export const DisplayIvuNegativeResultRecommendations: React.FC<{
  isEmbarazada: boolean;
}> = (props) => {
  return (
    <div className="bg-base-200 mt-4 px-2 py-4 border border-primary rounded-md shadow-md">
      <h3 className="text-lg font-semibold leading-7 text-primary">
        Recomendaciones adicionales
      </h3>
      <ul className="list-disc list-outside pl-6 text-sm leading-6 text-secondary">
        <li>No sintomas pero trae urocultivo positivo.</li>
        <li>
          No tratamiento a menos que procedimiento quirúrgico genitourinario.
        </li>
        {props.isEmbarazada && <li>No tratamiento a menos que embarazo.</li>}
      </ul>
    </div>
  );
};
