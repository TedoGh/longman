import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const Pagination = ({ data, itemsPerPage, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex gap-5 font-bold">
        {currentPage > 1 && (
          <button onClick={handlePrevPage}>
            <FaAnglesLeft color="#282A35" />
          </button>
        )}

        <span>
          {currentPage} / {totalPages}
        </span>
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>
            <FaAnglesRight color="#282A35" />
          </button>
        )}
      </div>
    </>
  );
};

export default Pagination;
