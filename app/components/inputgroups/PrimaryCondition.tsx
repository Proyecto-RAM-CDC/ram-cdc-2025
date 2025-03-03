import IVU from "~/images/Diseases/ivu.webp";
import ITS from "~/images/Diseases/its.webp";
import IRAS from "~/images/Diseases/iras.webp";
import EDAS from "~/images/Diseases/edas.webp";

interface IProps {
  id: number;
  name: string;
  detail: string;
  submitForm: (
    event: React.MouseEvent<HTMLButtonElement>,
    detail: string,
    id: number
  ) => void;
}

const PrimaryCondition: React.FC<IProps> = ({
  id,
  name,
  detail,
  submitForm
}) => {
  let imgsrc: string = "";
  if (name === "IVU") {
    imgsrc = IVU;
  } else if (name === "ITS") {
    imgsrc = ITS;
  } else if (name === "IRAS") {
    imgsrc = IRAS;
  } else if (name === "EDAS") {
    imgsrc = EDAS;
  }

  return (
    <button
      type="submit"
      onClick={(event) => submitForm(event, detail, id)}
      className="flex flex-col items-center my-6 mx-auto bg-white border border-accent rounded-lg shadow w-10/12 md:flex-row max-w-xs md:max-w-xl hover:bg-accent"
    >
      <img
        className="object-fill rounded-t-lg mx-auto max-w-[50%] md:h-40 md:rounded-none md:rounded-l-lg"
        src={imgsrc}
        alt={detail}
      />
      <div className="flex flex-col text-left justify-between p-4 w-6/12 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-accent-content">
          {name}
        </h5>
        <p className="mb-3 font-normal text-accent-content">{detail}</p>
      </div>
    </button>
  );
};

export default PrimaryCondition;
