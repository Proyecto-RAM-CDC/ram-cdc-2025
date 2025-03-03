import { Gene } from "@prisma/client";

interface GeneSearchProps {
  selectedGene: string[];
  setSelectedGene: (value: string[]) => void;
  list_of_genes_objs: Gene[] | null | undefined;
}

const GeneSearch: React.FC<GeneSearchProps> = (props) => {
  const handleGeneSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    // Check that each selected option is in the list of resistance objects.
    const allOptionsValid = selectedOptions.every((option) =>
      props.list_of_genes_objs?.some((gene) => gene.geneName === option)
    );

    if (allOptionsValid) {
      props.setSelectedGene(selectedOptions);
    }
  };

  return (
    <div className="col-start-1 col-span-12 border-2 border-dashed border-primary-content rounded-md p-1 pb-2 pl-2 pr-2">
      <label
        htmlFor="geneSelector"
        className="block text-xs sm:text-sm font-medium leading-6 text-primary-content"
      >
        Genes asociados a mecanismos de resistencia
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          id="geneSelector"
          name="geneSelector"
          data-testid="gene-select"
          multiple
          defaultValue={props.selectedGene}
          onChange={handleGeneSelectionChange}
          className="md:mt-1 input input-bordered input-info rounded-md w-full sm:w-4/12 h-28 py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content sm:mr-4"
        >
          {props.list_of_genes_objs
            ? props.list_of_genes_objs.map((gene) => (
                <option key={gene.id}>{gene.geneName}</option>
              ))
            : null}
        </select>
        <input
          id="geneVariant"
          type="text"
          name="geneVariant"
          placeholder="¿Número de la variante detectada?"
          className="md:mt-1 input input-bordered input-info rounded-md w-full sm:w-8/12 h-28 py-1.5 shadow-sm text-xs sm:text-sm sm:leading-6 font-medium bg-accent text-accent-content"
        />
      </div>
    </div>
  );
};

export default GeneSearch;
