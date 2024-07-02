import React, { useState } from "react";
import Filters from "../components/Filters";
import JobList from "../components/JobList";
import SortButton from "../components/SortButton";

const HomePage = () => {
  const [filterBySalary, setFilterBySalary] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedEmployers, setSelectedEmployers] = useState([]);

  return (
    <div className="container">
      <h1 className="my-4">Актуальные вакансии</h1>
      <Filters
        filterBySalary={filterBySalary}
        setFilterBySalary={setFilterBySalary}
        selectedEmployers={selectedEmployers}
        setSelectedEmployers={setSelectedEmployers}
      />
      <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <JobList
        filterBySalary={filterBySalary}
        sortOrder={sortOrder}
        selectedEmployers={selectedEmployers}
      />
    </div>
  );
};

export default HomePage;
