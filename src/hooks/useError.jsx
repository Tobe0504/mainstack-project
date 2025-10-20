import { capitalize } from "../lib/helpers/capitalize";
import { useToast } from "../context/ToastContext";

const useError = () => {
  // Custom Hooks
  const toast = useToast();

  const handleError = (err) => {
    console.log(err, "HN");

    toast.error(capitalize(err?.data) || capitalize(err.message));
  };

  return { handleError };
};

export default useError;
