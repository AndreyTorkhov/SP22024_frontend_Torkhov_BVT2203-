import React, { useState } from "react";
import Filters from "../components/Filters";
import JobList from "../components/JobList";
import SortButton from "../components/SortButton";

const HomePage = () => {
  const [filterBySalary, setFilterBySalary] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedEmployers, setSelectedEmployers] = useState([]);
  const [filterByAccredited, setFilterByAccredited] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  return (
    <div className="container">
      <h1 className="my-4">Актуальные вакансии</h1>
      <Filters
        filterBySalary={filterBySalary}
        setFilterBySalary={setFilterBySalary}
        selectedEmployers={selectedEmployers}
        setSelectedEmployers={setSelectedEmployers}
        filterByAccredited={filterByAccredited}
        setFilterByAccredited={setFilterByAccredited}
        selectedSchedules={selectedSchedules}
        setSelectedSchedules={setSelectedSchedules}
      />
      <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <JobList
        filterBySalary={filterBySalary}
        sortOrder={sortOrder}
        selectedEmployers={selectedEmployers}
        filterByAccredited={filterByAccredited}
        selectedSchedules={selectedSchedules}
      />
    </div>
  );
};

export default HomePage;
