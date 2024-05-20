import { cn } from "@/utils/classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  handlePage,
  totalPages,
}: PaginationProps) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePage(currentPage - 1);
    }
  };

  const classes = {
    button: cn("py-2 px-4 bg-light-blue/30 rounded-md", {
      "cursor-not-allowed bg-slate-400/40":
        currentPage === 1 || currentPage === totalPages,
    }),
  };

  return (
    <div className="w-full flex justify-center items-center my-4 gap-4 text-dark-blue font-medium ">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className={classes.button}>
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <p className="text-sm">
        {currentPage} de {totalPages}
      </p>
      <button
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
        className={classes.button}>
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
