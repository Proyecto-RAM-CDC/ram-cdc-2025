import React from "react";
import { typeDisplayIVUSyndromeProps } from "~/algorithms/utilitiesTypes";

export const DisplaySyndrome: React.FC<typeDisplayIVUSyndromeProps> = (
  props
) => {
  return (
    <div>
      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Requiere tratamiento antibiótico para{" "}
          <span className="italic">{props.title}</span>
        </h3>
        <ul className="list-disc list-outside pl-6 text-base leading-6 text-white font-semibold">
          {props.symptoms
            .filter((symptoms) => symptoms.condition)
            .map((symptom) => (
              <li key={symptom.id}>{symptom.description}</li>
            ))}
        </ul>
      </div>

      <div className="bg-accent py-4 px-2 mb-8 border-8 border-primary rounded-md shadow-md">
        <h3 className="text-2xl pb-1 underline font-semibold leading-7 text-primary">
          Tratamiento empírico
        </h3>
        <p className="text-lg font-semibold pl-2 text-primary">Elección:</p>
        <ul className="list-disc list-outside pl-6 text-base leading-6 text-white font-semibold">
          {props.treatments.map((treatment) => (
            <li key={treatment.id}>{treatment.description}</li>
          ))}
        </ul>
        <p className="text-lg font-semibold pl-2 text-primary">Alternativo:</p>
        <ul className="list-disc list-outside pl-6 text-base leading-6 text-white font-semibold">
          {props.alternatives.map((alternative) => (
            <li key={alternative.id}>{alternative.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
