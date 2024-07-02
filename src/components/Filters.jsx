import React, { useEffect, useState } from "react";
import { getUniqueEmployers } from "../Apis/network";

const Filters = ({
  filterBySalary,
  setFilterBySalary,
  selectedEmployers,
  setSelectedEmployers,
}) => {
  const [employers, setEmployers] = useState([]);
  const [employerStatus, setEmployerStatus] = useState({});

  useEffect(() => {
    const fetchEmployers = async () => {
      const uniqueEmployers = await getUniqueEmployers();
      setEmployers(uniqueEmployers);
    };

    fetchEmployers();
  }, []);

  useEffect(() => {
    const initialStatus = {};
    employers.forEach((employer) => {
      initialStatus[employer] = selectedEmployers.includes(employer)
        ? "selected"
        : "default";
    });
    setEmployerStatus(initialStatus);
  }, [employers, selectedEmployers]);

  const handleEmployerChange = (event, employer) => {
    event.preventDefault();
    const updatedStatus = { ...employerStatus };

    if (selectedEmployers.includes(employer)) {
      setSelectedEmployers((prevState) =>
        prevState.filter((item) => item !== employer)
      );
      updatedStatus[employer] = "default";
    } else {
      setSelectedEmployers((prevState) => [...prevState, employer]);
      updatedStatus[employer] = "selected";
    }

    setEmployerStatus(updatedStatus);
  };

  const renderEmployerLabel = (employer) => {
    if (employerStatus[employer] === "selected") {
      return (
        <span
          className="badge bg-success ms-2"
          style={{ fontSize: "80%", position: "relative", top: "-2px" }}
        >
          +
        </span>
      );
    }
    return null;
  };

  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="salaryCheckbox"
          checked={filterBySalary}
          onChange={() => setFilterBySalary(!filterBySalary)}
        />
        <label className="form-check-label" htmlFor="salaryCheckbox">
          Вакансии с указанной зарплатой
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="employerSelect">Работодатели:</label>
        <select
          multiple
          className="form-control"
          id="employerSelect"
          value={selectedEmployers}
          onChange={() => {}}
        >
          {employers.map((employer) => (
            <option
              key={employer}
              value={employer}
              onClick={(e) => handleEmployerChange(e, employer)}
            >
              {employer}
              {renderEmployerLabel(employer)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
