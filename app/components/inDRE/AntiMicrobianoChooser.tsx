import { useEffect, useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";

import AntiMicrobianoTable from "~/components/inDRE/AntiMicrobianoTable";
import LoaderAnimation from "~/utilities/LoaderAnimation";

interface IProps {
  selectedBacteria: string;
}

interface FetcherData {
  error?: string;
  antimicrobianoNames: string[];
}

const AntimicrobianoSearch: React.FC<IProps> = ({ selectedBacteria }) => {
  // You only enter into this module (from 'AgregarRegistro.tsx') if 'selectedBacteria' is an
  // actual bacteria, i.e. not an empty string.

  const fetcher = useFetcher<FetcherData>();

  // These are the antimicrobials that are fetched from the database based on the selected bacteria.
  // The 'useFetcher' hook calls the 'loader' function in the route '_app.indre.antimicrobianos.tsx'
  // to fetch the antimicrobials for the selected bacteria. The JSON response from that route is
  // stored in 'fetcher.data', which is what the second 'useEffect' hook below listens for.
  const [antimicrobialList, setAntimicrobialList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Store fetcher in a ref
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  // Upon selecting a bacteria from the dropdown menu (see 'BacteriaChooser.tsx'), this 'useEffect'
  // hook is triggered. It programmatically invokes the loader function in the
  // route '_app.indre.antimicrobianos.tsx'. The JSON response from that route is then stored in
  // 'fetcher.data', which is what the second 'useEffect' hook below listens for.
  useEffect(() => {
    if (selectedBacteria !== "") {
      setLoading(true); // Set loading state when fetching starts.
      const bacteriaQuery = selectedBacteria.replace(" ", "%20");
      fetcherRef.current.load(
        `/indre/antimicrobianos?bacteria=${bacteriaQuery}`
      );
    }
  }, [selectedBacteria]);

  // The 'useEffect' hook listens for changes to 'fetcher.data'.
  useEffect(() => {
    if (fetcher.state === "loading") {
      setLoading(true); // Fetching started or ongoing.
    } else if (fetcher.state === "idle") {
      if (fetcher.data) {
        if (fetcher.data.error) {
          setError(fetcher.data.error); // Set error if present in response.
          setLoading(false); // Clear loading state.
          setAntimicrobialList([]); // Clear list.
        } else if (fetcher.data.antimicrobianoNames) {
          setLoading(false); // Clear loading state.
          setAntimicrobialList(fetcher.data.antimicrobianoNames); // Set data.
          setError(null); // Clear any previous error.
        }
      }
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className="col-start-1 col-span-12" id="antimicrobianoSelecting">
      {loading ? (
        <div className="h-[400px] overflow-y-auto border-2 border-dashed border-primary-content rounded-md p-3">
          <div className="flex items-center justify-center h-full">
            <LoaderAnimation />
          </div>
        </div>
      ) : error ? (
        <div className="h-[400px] overflow-y-auto border-2 border-dashed border-primary-content rounded-md p-3">
          <div className="bg-red-500 text-white p-3 rounded-md">
            <p>Error: {error}</p>
          </div>
        </div>
      ) : antimicrobialList.length > 0 ? (
        <div className="h-[400px] overflow-y-auto border-2 border-dashed border-primary-content rounded-md p-3">
          <AntiMicrobianoTable antimicrobialsList={antimicrobialList} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>No antimicrobials found.</p>
        </div>
      )}
    </div>
  );
};

export default AntimicrobianoSearch;
