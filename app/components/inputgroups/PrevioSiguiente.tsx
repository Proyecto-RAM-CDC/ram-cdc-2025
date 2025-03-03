import { Link } from "@remix-run/react";
import { useStepStore } from "~/state/store";

export default function PrevioSiguiente() {
  const { handleStepChange } = useStepStore();

  return (
    <div className="flex items-center justify-end gap-x-6 border-t-2 border-accent px-4 py-4 sm:px-8 mt-16">
      <Link
        to="/add/primary"
        onClick={() => handleStepChange("02")}
        className="btn btn-secondary btn-sm"
      >
        Previo
      </Link>
      <button
        type="submit"
        onClick={() => handleStepChange("04")}
        className="btn btn-primary btn-sm"
      >
        Siguiente
      </button>
    </div>
  );
}
