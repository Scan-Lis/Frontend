import { cn } from "@/utils/classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  handlePage,
}: PaginationProps) => {
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePage(currentPage - 1);
    }
  };

  const classes = {
    button: cn("py-2 px-4 bg-light-blue/30 rounded-md"),
  };

  return (
    <div className="w-full flex justify-center items-center my-4 gap-4 text-dark-blue font-medium ">
      <button
        disabled={currentPage === 0}
        onClick={handlePrevPage}
        className={classes.button}>
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <p className="text-sm">
        {currentPage + 1} de {totalPages}
      </p>
      <button
        disabled={currentPage === totalPages - 1}
        onClick={handleNextPage}
        className={classes.button}>
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
