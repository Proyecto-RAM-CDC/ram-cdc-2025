import {
  TrainingSpecialA,
  TrainingSpecialB,
  TrainingSpecialC,
} from "~/icons/training_special";

const TrainingCard = () => {
  return (
    <div className="h-full w-full bg-gray-400 mt-10 py-12 p-4 rounded-md">
      <div className="grid gap-14 lg:grid-cols-3 md:gap-5">
        {/* FIRST CARD */}
        <div className="rounded-xl bg-white p-6 text-center shadow-xl">
          <TrainingSpecialA />
          <h1 className="text-darken mb-3 -mt-5 md:mt-0 text-sm md:text-xl font-medium">
            SECRETARÍA DE SALUD
          </h1>
          <ul className="text-xs sm:text-sm text-accent leading-5 sm:leading-6 text-left">
            <li>
              <p className="font-semibold underline">
                Dr. Jorge Alcocer Varela
              </p>{" "}
              Secretario de Salud.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Dr. Hugo López-Gatell Ramírez
              </p>{" "}
              Subsecretario de Prevención y Promoción de la Salud; Subsecretario
              de Integración y Desarrollo del Sector Salud.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Dr. Gabriel García Rodríguez
              </p>{" "}
              Director General de Epidemiología.
            </li>
          </ul>
        </div>

        {/* SECOND CARD */}
        <div
          data-aos-delay="150"
          className="rounded-xl bg-white p-6 text-center shadow-xl"
        >
          <TrainingSpecialB />
          <h1 className="text-darken mb-3 -mt-5 md:mt-0 text-sm md:text-xl font-medium">
            INSTITUTO DE DIAGNÓSTICO Y REFERENCIA EPIDEMIOLÓGICOS &quot;DR.
            MANUEL MARTÍNEZ BÁEZ&quot; INDRE
          </h1>
          <ul className="text-xs sm:text-sm text-accent leading-5 sm:leading-6 text-left">
            <li>
              <p className="font-semibold underline">
                Biól. Irma López Martínez
              </p>{" "}
              Directora de Diagnóstico y Referencia.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Mtra. Lucía Hernández Rivas
              </p>{" "}
              Directora de Servicios y Apoyo Técnico.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                C.P. Julie Jeannette Ramírez Hernández
              </p>{" "}
              Subdirectora de Operación.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Biól. Norma Angélica Montes Colima
              </p>{" "}
              Jefa del Departamento de Bacteriología.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Mtra. Judith Estévez Ramírez
              </p>{" "}
              Jefa del Departamento de Control de Muestras y Servicios.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Dra. Gabriela Meneses Ruiz
              </p>{" "}
              Jefa del Departamento de Parasitología.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                Dra. Herlinda García Lozano
              </p>{" "}
              Jefa del Departamento de Virología.
            </li>
          </ul>
        </div>

        {/* THIRD CARD */}
        <div
          data-aos-delay="300"
          className="rounded-xl bg-white p-6 text-center shadow-xl"
        >
          <TrainingSpecialC />
          <h1 className="text-darken mb-3 -mt-5 md:mt-0 text-sm md:text-xl font-medium">
            GRUPO DE TRABAJO - LABORATORIO DE RESISTENCIA ANTIMICROBIANA
          </h1>
          <ul className="text-xs sm:text-sm text-accent leading-5 sm:leading-6 text-left">
            <li>
              <p className="font-semibold underline">
                Mtro. Javier de Jesús Piñón Ortega
              </p>{" "}
              Jefe del Laboratorio de Resistencia Antimicrobiana, Departamento
              de Bacteriología.
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                M. en GS. Luz Jareny Millán Ibarra
              </p>
            </li>
            <li className="mt-2">
              <p className="font-semibold underline">
                QBP. Kirvi Daniel Villanueva González
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
