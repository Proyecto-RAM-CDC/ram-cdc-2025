const faqs = [
  {
    id: 1,
    question: "Personal de salud",
    answer:
      "Conocer a quienes usan la presente app, corroborar sus credenciales y generar una red de trabajo.",
  },
  {
    id: 2,
    question: "Pacientes en consulta",
    answer:
      "Sus datos serán registrados por el personal de salud, algunos de ellos de manera opcional, con el fin de generar de conocer sus detalles de salud y ofrecer una mejor respuesta de uso de antibióticos a usted y a futuras personas que lo requieran, al ampliar nuestra base de conocimiento.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex-auto w-screen bg-gradient-to-br from-base-100 from-50% to-base-300 to-95%">
      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight sm:text-4xl text-primary">
          Aviso de Privacidad
        </h2>
        <p className="mt-6 text-sm sm:text-lg leading-6 sm:leading-8 text-secondary max-w-4xl">
          Los datos personales que nos proporcionen aquí, tanto del personal de
          salud, como de pacientes, están protegidos conforme a lo dispuesto por
          la Ley General de Protección de Datos Personales en Posesión de
          Sujetos Obligados, y toda normatividad aplicable.
        </p>
      </div>

      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8">
        <div className="text-primary text-base sm:text-xl font-semibold italic mb-4">
          Las finalidades de conocer sus datos
        </div>
        <dl className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <dt className="text-sm sm:text-base font-semibold leading-6 text-accent">
                {faq.question}
              </dt>
              <dd className="sm:mt-2 text-sm sm:text-base leading-6 text-neutral">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8">
        <p className="text-base sm:text-lg leading-6 sm:leading-7 text-secondary max-w-4xl">
          Se informa que pueden recabarse datos personales sensibles como:
        </p>
        <ul className="list-disc list-inside text-neutral text-sm">
          <li>Estado de salud presente y pasado.</li>
          <li>Preferencia sexual.</li>
        </ul>
      </div>

      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8 bg-base-200 border-t border-secondary mt-4">
        <div className="text-primary text-base sm:text-xl font-semibold italic mb-4">
          Información ampliada sobre sus datos personales
        </div>
        <dl className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
          <div>
            <dt className="text-sm sm:text-base font-semibold sm:leading-6 text-accent">
              Estos son los datos que recabaremos de usted como paciente o
              persona usuaria de la consulta médica de forma obligatoria:
            </dt>
            <dd className="mt-2 text-sm sm:text-base sm:leading-6 text-secondary">
              <ul className="list-disc list-inside text-neutral text-sm">
                <li>Fecha de nacimiento.</li>
                <li>Sexo al nacer.</li>
                <li>Género.</li>
                <li>Peso.</li>
                <li>Talla.</li>
                <li>Condiciones crónicas y otros datos clínicos.</li>
              </ul>
            </dd>
          </div>
          <div>
            <dt className="text-sm sm:text-base font-semibold sm:leading-6 text-accent">
              Estos son los datos que recabaremos de usted como paciente o
              persona usuaria de la consulta médica de manera opcional:
            </dt>
            <dd className="mt-2 text-sm sm:text-base sm:leading-6 text-secondary">
              <ul className="list-disc list-inside text-neutral text-sm">
                <li>CURP.</li>
                <li>Nombre.</li>
                <li>Dirección.</li>
                <li>Estado civil.</li>
                <li>Grado de estudios.</li>
                <li>Lugar de origen.</li>
                <li>Correo y celular.</li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8 bg-base-200">
        <div className="text-primary text-base sm:text-xl font-semibold italic mb-2">
          Así se protegen sus datos
        </div>
        <p className="mt-2 text-sm sm:text-base sm:leading-6 text-secondary max-w-4xl">
          El tratamiento de sus datos personales se realiza con fundamento en el
          artículo 4º párrafo tercero de la Constitución Política de los Estados
          Unidos Mexicanos; 33, 32, 134 fracciones VIII y XIII de la Ley General
          de Salud; numerales 7.3.2.2, 7.4.5.3 y 8.2 de la Norma Oficial
          Mexicana NOM-039-SSA2-2014; artículo 46 fracción IV del Reglamento
          Interior de la Secretaría de Salud; y las demás relativas y
          aplicables.
        </p>
      </div>

      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8 bg-base-200">
        <div className="text-primary text-base sm:text-xl font-semibold italic mb-2">
          Transferencia de datos
        </div>
        <p className="mt-2 text-sm sm:text-base sm:leading-6 text-secondary max-w-4xl">
          Tenga en cuenta que al aceptar el uso de la app nos otorga permiso
          para usar y transferir algunos de estos datos en México y otros
          países, con fines de documentación de los patógenos que aquejan
          algunas zonas del país y su resistencia al uso de antibióticos.
        </p>
        <p className="mt-2 text-sm sm:text-base sm:leading-6 text-secondary max-w-4xl">
          Los datos, especialmente los más sensibles quedan al amparo de las
          leyes vigentes en México y posibles países donde se comparta la
          información.
        </p>
      </div>

      <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8 bg-base-200 border-b border-secondary mb-4">
        <div className="text-primary text-base sm:text-xl font-semibold italic mb-2">
          ¿Dónde se pueden ejercer los derechos de Acceso, Rectificación,
          Cancelación y Oposición de datos personales?
        </div>
        <p className="mt-2 text-sm sm:text-base sm:leading-6 text-secondary max-w-4xl">
          En caso necesario, usted puede presentar su solicitud para el
          ejercicio de los derechos ARCO - de acceso, rectificación, cancelación
          u oposición de sus datos personales.
        </p>
        <ol type="1" className="list-decimal list-inside mt-4">
          <li className="text-secondary text-sm">
            Ante la Unidad de Transparencia de la Secretaría de Salud.
            Domicilio: Avenida Marina Nacional 60 PB, Colonia Colonia Tacuba,
            Miguel Hidalgo, CDMX, CP. 11410, CDMX, México Correo electrónico:
            unidadenlace@salud.gob.mx Número telefónico y extensión: 50621600
            Ext. 42011 y 53005
          </li>
          <li className="text-secondary text-sm mt-2">
            A través de la Plataforma Nacional de Transparencia
            (http://www.plataformadetransparencia.org.mx)
          </li>
        </ol>
      </div>
    </main>
  );
}

export function headers() {
  return {
    "Cache-Control": "public, max-age=3600", // Only after 1 hour will a fresh copy be requested.
  };
}

export const handle = { disableJS: true };
