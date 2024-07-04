import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs, getJobsWithSalary, getAccreditedJobs } from "../Apis/network";

const JobList = ({
  filterBySalary,
  sortOrder,
  selectedEmployers,
  filterByAccredited,
  selectedSchedules,
}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      let fetchedJobs;
      if (filterBySalary) {
        fetchedJobs = await getJobsWithSalary();
      } else {
        fetchedJobs = await getJobs();
      }

      if (filterByAccredited) {
        fetchedJobs = await getAccreditedJobs(true);
      }

      if (selectedEmployers.length > 0) {
        fetchedJobs = fetchedJobs.filter((job) =>
          selectedEmployers.includes(job.employer)
        );
      }

      if (selectedSchedules.length > 0) {
        fetchedJobs = fetchedJobs.filter((job) =>
          selectedSchedules.includes(job.schedule_name)
        );
      }

      if (sortOrder) {
        fetchedJobs.sort((a, b) =>
          sortOrder === "asc" ? a.id - b.id : b.id - a.id
        );
      }

      setJobs(fetchedJobs);
    };

    fetchJobs();
  }, [
    filterBySalary,
    sortOrder,
    selectedEmployers,
    filterByAccredited,
    selectedSchedules,
  ]);

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
