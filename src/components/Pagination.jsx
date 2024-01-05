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
      <div className="flex gap-5">
        <button
          className="text-[#1d2939] font-bold"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          {"<<"}
        </button>
        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={
              currentPage === index + 1 &&
              "bg-green text-[#fff] w-10 h-10 rounded-lg"
            }
          >
            {index + 1}
          </button>
        ))} */}
        <span className="font-bold">
          {currentPage} / {totalPages}
        </span>
        <button
          className="text-[#1d2939] font-bold"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Pagination;
