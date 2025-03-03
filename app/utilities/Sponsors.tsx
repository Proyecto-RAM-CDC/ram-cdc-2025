import logo_csg from "~/images/Logos/csg.webp";
import logo_enaram_coiss from "~/images/Logos/enaram_coiss.webp";
import logo_imss from "~/images/Logos/imss.webp";
import logo_imss_bienstar from "~/images/Logos/imss-bienestar.webp";
import logo_issste from "~/images/Logos/issste.webp";
import logo_pemex from "~/images/Logos/pemex.webp";
import logo_sedena from "~/images/Logos/sedena.webp";
import logo_semar from "~/images/Logos/semar.webp";
import logo_sesa from "~/images/Logos/sesa.webp";
import logo_salud from "~/images/Logos/salud.webp";

export default function Sponsors() {
  return (
    <div className="relative justify-center items-center mx-auto my-4 lg:my-16 w-5/6 bg-base-100 rounded-lg z-10">
      <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary via-accent to-secondary opacity-75 blur z-0"></div>
      <div className="relative mt-4 mb-6 p-6 grid h-full grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-12 md:gap-y-16 sm:grid-cols-4 items-center bg-base-100 z-20">
        <div className="col-span-full flex justify-center">
          <h1 className="text-md sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-accent italic">
            Muchísimos agradecimientos a las siguientes instituciones
          </h1>
        </div>
        <img
          src={logo_csg}
          alt="CSG"
          className="max-w-xs w-3/6 sm:w-4/6 mx-4 justify-self-center"
        />

        <img
          src={logo_enaram_coiss}
          alt="ENARAM-COISS"
          className="max-h-20 md:max-h-24 mx-4 justify-self-center"
        />
        <img
          src={logo_imss}
          alt="IMSS"
          className="max-h-20 md:max-h-24 mx-4 justify-self-center"
        />
        <img
          src={logo_imss_bienstar}
          alt="IMSS-BIENESTAR"
          className="max-h-20 md:max-h-24 mx-4 justify-self-center"
        />
        <img
          src={logo_issste}
          alt="ISSSTE"
          className="max-w-xs w-3/6 sm:w-4/6 mx-4 justify-self-center"
        />
        <img
          src={logo_pemex}
          alt="PEMEX"
          className="max-h-16 mx-4 justify-self-center"
        />
        <img
          src={logo_sedena}
          alt="SEDENA"
          className="max-w-xs w-3/6 sm:w-4/6 mx-4 justify-self-center"
        />
        <img
          src={logo_semar}
          alt="SEMAR"
          className="max-w-xs w-3/6 sm:w-4/6 mx-4 justify-self-center"
        />
        <img
          src={logo_sesa}
          alt="SESA"
          className="max-w-xs w-3/6 sm:w-4/6 mx-4 justify-self-center"
        />
        <img
          src={logo_salud}
          alt="SALUD"
          className="max-w-xs w-3/6 mx-4 justify-self-center"
        />
      </div>
    </div>
  );
}
