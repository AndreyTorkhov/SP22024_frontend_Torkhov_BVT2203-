import React from "react";

const SortButton = ({ sortOrder, setSortOrder }) => {
  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <button onClick={handleSortOrderChange} className="btn btn-primary mb-3">
      Дата публикации вакансии ({sortOrder === "asc" ? "Новые" : "Старые"})
    </button>
  );
};

export default SortButton;
