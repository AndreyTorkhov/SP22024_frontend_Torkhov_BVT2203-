import React, { useEffect, useState } from "react";
import { getUniqueEmployers, getUniqueSchedules } from "../Apis/network";

const Filters = ({
  filterBySalary,
  setFilterBySalary,
  selectedEmployers,
  setSelectedEmployers,
  filterByAccredited,
  setFilterByAccredited,
  selectedSchedules,
  setSelectedSchedules,
}) => {
  const [employers, setEmployers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [employerStatus, setEmployerStatus] = useState({});
  const [scheduleStatus, setScheduleStatus] = useState({});

  useEffect(() => {
    const fetchEmployers = async () => {
      const uniqueEmployers = await getUniqueEmployers();
      setEmployers(uniqueEmployers);
    };

    fetchEmployers();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      const uniqueSchedules = await getUniqueSchedules();
      setSchedules(uniqueSchedules);
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const initialEmployerStatus = {};
    employers.forEach((employer) => {
      initialEmployerStatus[employer] = selectedEmployers.includes(employer)
        ? "selected"
        : "default";
    });
    setEmployerStatus(initialEmployerStatus);

    const initialScheduleStatus = {};
    schedules.forEach((schedule) => {
      initialScheduleStatus[schedule] = selectedSchedules.includes(schedule)
        ? "selected"
        : "default";
    });
    setScheduleStatus(initialScheduleStatus);
  }, [employers, schedules, selectedEmployers, selectedSchedules]);

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

  const handleScheduleChange = (event, schedule) => {
    event.preventDefault();
    const updatedStatus = { ...scheduleStatus };

    if (selectedSchedules.includes(schedule)) {
      setSelectedSchedules((prevState) =>
        prevState.filter((item) => item !== schedule)
      );
      updatedStatus[schedule] = "default";
    } else {
      setSelectedSchedules((prevState) => [...prevState, schedule]);
      updatedStatus[schedule] = "selected";
    }

    setScheduleStatus(updatedStatus);
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

  const renderScheduleLabel = (schedule) => {
    if (scheduleStatus[schedule] === "selected") {
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
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="accreditedCheckbox"
          checked={filterByAccredited}
          onChange={() => setFilterByAccredited(!filterByAccredited)}
        />
        <label className="form-check-label" htmlFor="accreditedCheckbox">
          Вакансии в аккредитованных компаниях
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
      <div className="form-group">
        <label htmlFor="scheduleSelect">График работы:</label>
        <select
          multiple
          className="form-control"
          id="scheduleSelect"
          value={selectedSchedules}
          onChange={() => {}}
        >
          {schedules.map((schedule) => (
            <option
              key={schedule}
              value={schedule}
              onClick={(e) => handleScheduleChange(e, schedule)}
            >
              {schedule}
              {renderScheduleLabel(schedule)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
