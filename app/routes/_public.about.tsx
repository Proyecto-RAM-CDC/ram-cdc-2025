import { Link } from "@remix-run/react";
import { useState, MouseEvent } from "react";
import LeavePage from "~/components/navigation/ConfirmLeaving";
import RandomImage from "~/utilities/ImageGenerator";
import Sponsors from "~/utilities/Sponsors";

const features = [
  {
    name: "Infección del tracto urinario (IVU)",
    link: "https://www.gob.mx/salud/articulos/como-prevenir-las-infecciones-del-tracto-urinario",
    description:
      "Las infecciones del tracto urinario, donde se produce y almacena la orina (producto de desecho del organismo), son más comunes en las mujeres que en hombres. Existen medidas de prevención para disminuir el riesgo de padecer estas infecciones como beber al menos de 6 a 8 vasos de agua diariamente, mantener buenas prácticas de higiene en el área genital, orinar frecuentemente, utilizar ropa interior de algodón y evitar la ropa ajustada.",
  },
  {
    name: "Infecciones de Transmisión Sexual (ITS)",
    link: "https://www.gob.mx/censida/es/articulos/infeciones-de-transmision-sexual-its-76848",
    description:
      "Las ITS son las siglas con que se identifican a las Infecciones de Transmisión Sexual. Los síntomas pueden aparecer entre la primera semana y hasta tres meses (para las verrugas) después de la relación sexual (sin protección).",
  },
  {
    name: "Infecciones del aparato respiratorio superior (IRAS)",
    link: "https://www.gob.mx/salud/articulos/infecciones-respiratorias-agudas-iras.%20Published%202009",
    description:
      "Las infecciones respiratorias agudas son enfermedades que afectan desde oídos, nariz, garganta hasta los pulmones, generalmente se autolimitan, es decir, no requieres de antibióticos para curarlas y no suelen durar más de 15 días.",
  },
  {
    name: "Enfermedades Diarreicas Agudas (EDAS)",
    link: "https://www.gob.mx/salud/articulos/enfermedades-diarreicas-agudas-edas",
    description:
      "La diarrea es una enfermedad que afecta al intestino, se caracteriza por un aumento en el número habitual de evacuaciones (excremento), éstas suelen ser muy aguadas o líquidas, puede haber moco o sangre y las niñas y niños pueden tener calentura o vómito.",
  },
];

export default function AboutPage() {
  const [showWarning, setShowWarning] = useState(false);
  const [externalLink, setExternalLink] = useState("");

  const handleExternalLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLAnchorElement;
    if (!target.href.startsWith(window.location.origin)) {
      event.preventDefault();
      setShowWarning(true);
      setExternalLink(target.href);
    }
  };

  const handleConfirm = () => {
    setShowWarning(false);
    window.location.href = externalLink;
  };

  const handleCancel = () => {
    setShowWarning(false);
  };

  return (
    <main className="flex-auto w-screen bg-gradient-to-br from-base-100 from-50% to-base-300 to-95%">
      {showWarning && (
        <LeavePage
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          targetURL={externalLink}
        />
      )}

      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:mx-0 sm:mt-4 mb-6">
          <h2 className="text-xl font-bold tracking-tight sm:text-4xl text-primary">
            ¿Quiénes somos?
          </h2>
          <p className="mt-6 text-sm sm:text-lg leading-6 sm:leading-8 text-base-100-content">
            El Comité Técnico sobre Resistencia a los Antimicrobianos presenta
            esta herramienta de apoyo al profesional de salud para el
            diagnóstico y tratamiento de algunas infecciones en el primer nivel
            de atención. Lo anterior, con el objetivo contrarrestar la
            resistencia antimicrobiana (RAM) en México.
          </p>
          <p className="mt-6 text-sm sm:text-lg leading-6 sm:leading-8 text-base-100-content">
            Asimismo, estamos creando una base de conocimiento que próximamente
            nos permita informar sobre alertas tempranas en zonas con
            particulares señales de una resistencia específica.
          </p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <p className="text-xs sm:text-sm md:text-base text-base-100-content leading-5 sm:leading-6">
                El Comité Técnico sobre Resistencia a los Antimicrobianos fue
                creado el 15 de junio del 2023 y tiene por objeto llevar a cabo
                las tareas de seguimiento para el cumplimiento de los objetivos,
                estrategias y líneas de acción de la Estrategia Nacional de
                Acción contra la Resistencia a los Antimicrobianos (ENARAM).
              </p>
            </div>
            <div className="flex items-center justify-end">
              <RandomImage
                duration={8}
                classes="aspect-[6/5] object-cover w-9/12 sm:w-full max-w-xs sm:max-w-sm 2xl:max-w-lg rounded-2xl shadow-lg border-2 border-secondary object-cover mx-auto my-auto"
              />
            </div>
            <div className="hidden sm:flex sm:items-center">
              <RandomImage
                duration={9}
                classes="aspect-[6/5] object-cover w-9/12 sm:w-full max-w-xs sm:max-w-sm 2xl:max-w-lg rounded-2xl shadow-lg border-2 border-secondary object-cover mx-auto my-auto"
              />
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-end">
              <p className="text-xs sm:text-sm md:text-base text-base-100-content leading-5 sm:leading-6">
                El acuerdo estableció que el Comité está presidido por la
                persona titular de la Secretaría del Consejo de Salubridad
                General. Al frente de la Secretaría Técnica se designa a un
                personal directivo del Consejo de Salubridad General. Forman
                parte del Comité, con voz y voto, las personas titulares de la
                Comisión Coordinadora de Institutos Nacionales de Salud y
                Hospitales de Alta Especialidad (CCINSHAE), Centro Nacional de
                Programas Preventivos y Control de Enfermedades (Cenaprece),
                Dirección General de Epidemiología (DGE), Instituto de
                Diagnóstico y Referencia Epidemiológicos (InDRE) y de la
                Dirección General de Calidad y Educación en Salud.
              </p>
            </div>
            <div className="sm:hidden flex items-center justify-end">
              <p className="text-xs sm:text-sm md:text-base text-base-100-content leading-5 sm:leading-6">
                El acuerdo estableció que el Comité está presidido por la
                persona titular de la Secretaría del Consejo de Salubridad
                General. Al frente de la Secretaría Técnica se designa a un
                personal directivo del Consejo de Salubridad General. Forman
                parte del Comité, con voz y voto, las personas titulares de la
                Comisión Coordinadora de Institutos Nacionales de Salud y
                Hospitales de Alta Especialidad (CCINSHAE), Centro Nacional de
                Programas Preventivos y Control de Enfermedades (Cenaprece),
                Dirección General de Epidemiología (DGE), Instituto de
                Diagnóstico y Referencia Epidemiológicos (InDRE) y de la
                Dirección General de Calidad y Educación en Salud.
              </p>
            </div>
            <div className="sm:hidden flex items-center">
              <RandomImage
                duration={9}
                classes="aspect-[6/5] object-cover w-9/12 sm:w-full max-w-xs sm:max-w-sm 2xl:max-w-lg rounded-2xl shadow-lg border-2 border-secondary mx-auto my-auto"
              />
            </div>
            <div className="flex items-center">
              <p className="text-xs sm:text-sm md:text-base text-base-100-content leading-5 sm:leading-6">
                Y una persona representante de cada una de las siguientes áreas
                de la Secretaría de Salud: Subsecretaría de Prevención y
                Promoción de la Salud, Comisión Federal para la Protección
                contra Riesgos Sanitarios (Cofepris), Instituto Mexicano del
                Seguro Social para el Bienestar (IMSS-BIENESTAR); Instituto
                Mexicano del Seguro Social (IMSS); Instituto de Seguridad y
                Servicios Sociales de los Trabajadores del Estado (ISSSTE),
                Secretaría de Agricultura y Desarrollo Rural Secretaría de Medio
                Ambiente y Recursos Naturales.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <RandomImage
                duration={10}
                classes="aspect-[6/5] object-cover w-9/12 sm:w-full max-w-xs sm:max-w-sm 2xl:max-w-lg rounded-2xl shadow-lg border-2 border-secondary object-cover mx-auto my-auto"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 sm:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-16 leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col justify-center border border-secondary rounded-md shadow-md p-4 bg-base-200 text-base-200-content"
            >
              <dt className="font-semibold md:text-lg text-secondary">
                {feature.name}
              </dt>
              <dd className="mt-1 text-base-300-content text-xs sm:text-sm md:text-base leading-5 sm:leading-6">
                {feature.description}
              </dd>
              <Link
                to={feature.link}
                onClick={handleExternalLinkClick}
                className="link link-info text-xs sm:text-sm font-semibold"
              >
                ¡Lea más en el sitio web de la Secretaría de Salud!
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Sponsors />
    </main>
  );
}

export function headers() {
  return {
    "Cache-Control": "public, max-age=3600", // Only after 1 hour will a fresh copy be requested.
  };
}
