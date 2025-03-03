import React, { useState, useEffect } from "react";

interface AntiMicrobianoTableProps {
  antimicrobialsList: string[];
}

const AntiMicrobianoTable: React.FC<AntiMicrobianoTableProps> = ({
  antimicrobialsList,
}) => {
  // Initialize state for checkboxes.
  const [checkboxState, setCheckboxState] = useState(
    antimicrobialsList.map(() => ({
      sensible: false,
      intermedio: false,
      resistente: false,
      cmi: "",
    }))
  );

  // Update checkboxState when antimicrobialsList changes.
  useEffect(() => {
    setCheckboxState((prevState) => {
      const newState = antimicrobialsList.map((_, index) => {
        return (
          prevState[index] || {
            sensible: false,
            intermedio: false,
            resistente: false,
            cmi: "",
          }
        );
      });
      return newState;
    });
  }, [antimicrobialsList]);

  // Handle checkbox change.
  const handleCheckboxChange = (
    index: number,
    type: "sensible" | "intermedio" | "resistente"
  ) => {
    const newState = [...checkboxState];
    newState[index][type] = !newState[index][type];
    setCheckboxState(newState);
  };

  // Handle CMI input change.
  const handleCmiChange = (index: number, value: string) => {
    const newState = [...checkboxState];
    newState[index].cmi = value;
    setCheckboxState(newState);
  };

  // For each string in 'antimicrobialList', split the string at the underscore character.
  // The first part of the string is the antimicrobial name, and the second part is the color.
  const antimicrobialsData = antimicrobialsList.map((antimicrobial) => {
    const [name, color] = antimicrobial.split("_");
    return { name, color };
  });
  const antimicrobialsNames: string[] = antimicrobialsData.map(
    (data) => data.name
  );
  const antimicrobialsColors: string[] = antimicrobialsData.map(
    (data) => data.color
  );

  return (
    <div className="overflow-x-auto bg-accent">
      <table className="table table-xs table-pin-rows table-pin-cols text-xs">
        <thead>
          <tr>
            <th className="text-center"></th>
            <td className="text-left">Antimicrobiano</td>
            <td className="text-center">Sensible</td>
            <td className="text-center">Intermedio</td>
            <td className="text-center">Resistente</td>
            <td className="text-center">CMI</td>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {antimicrobialsNames.map((antimicrobial, index) => {
            const state = checkboxState[index] || {
              sensible: false,
              intermedio: false,
              resistente: false,
              cmi: "",
            };
            const { sensible, intermedio, resistente, cmi } = state;

            // Get the corresponding color from antimicrobialsColors
            const color = antimicrobialsColors[index];

            return (
              <tr key={index}>
                <td className="text-center"></td>
                <td className="text-left" style={{ color: color }}>
                  {antimicrobial}
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    name={`sensible-${antimicrobial}`}
                    checked={sensible}
                    onChange={() => handleCheckboxChange(index, "sensible")}
                    disabled={intermedio || resistente}
                    data-testid={`sensible-checkbox-${index}`}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    name={`intermedio-${antimicrobial}`}
                    checked={intermedio}
                    onChange={() => handleCheckboxChange(index, "intermedio")}
                    disabled={sensible || resistente}
                    data-testid={`intermedio-checkbox-${index}`}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    name={`resistente-${antimicrobial}`}
                    checked={resistente}
                    onChange={() => handleCheckboxChange(index, "resistente")}
                    disabled={sensible || intermedio}
                    data-testid={`resistente-checkbox-${index}`}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    name={`cmi-${antimicrobial}`}
                    step="0.01"
                    value={cmi}
                    onChange={(e) => handleCmiChange(index, e.target.value)}
                    className="w-[100px] text-center text-xs"
                    data-testid={`cmi-input-${index}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th className="text-center"></th>
            <td className="text-left">Antimicrobiano</td>
            <td className="text-center">Sensible</td>
            <td className="text-center">Intermedio</td>
            <td className="text-center">Resistente</td>
            <td className="text-center">CMI</td>
            <th className="text-center"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AntiMicrobianoTable;
