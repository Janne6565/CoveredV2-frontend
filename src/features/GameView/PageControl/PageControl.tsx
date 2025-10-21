import { useState, useEffect } from "react";

interface PageControlProps {
  currentPage: number;
  maxPage: number;
  itemsPerPage: number;
  totalItems: number;
  searchTerm?: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  onSearchChange?: (searchTerm: string) => void;
  itemsPerPageOptions?: number[];
  showSearch?: boolean;
  className?: string;
}

const PageControl = ({
                       currentPage,
                       maxPage,
                       itemsPerPage,
                       totalItems,
                       searchTerm = "",
                       onPageChange,
                       onItemsPerPageChange,
                       onSearchChange,
                       itemsPerPageOptions = [10, 20, 50, 100],
                       showSearch = true,
                       className = ""
                     }: PageControlProps) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const page = parseInt(inputValue);
    if (!isNaN(page) && page >= 1 && page <= maxPage) {
      onPageChange(page);
    } else {
      setInputValue(currentPage.toString());
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    onItemsPerPageChange(newItemsPerPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <div className={"flex flex-col gap-4 w-[1100px] m-auto " + className}>
      <div className="flex items-center justify-between gap-4 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Page</span>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              min={1}
              max={maxPage}
              className="w-16 px-2 py-1 text-center bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <span className="text-gray-400 w-[40px]">of {maxPage}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === maxPage}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>

        {showSearch && onSearchChange && (
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search games..."
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 min-w-[325px] justify-end">
          {searchTerm && (
            <>
              <span className="text-gray-400 text-sm">
                {totalItems} result{totalItems !== 1 ? "s" : ""}
              </span>
              <div className="h-6 w-px bg-gray-600" />
            </>
          )}

          <div className="flex items-center gap-2 min-w-[200px]">
            <span className="text-gray-400">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageControl;