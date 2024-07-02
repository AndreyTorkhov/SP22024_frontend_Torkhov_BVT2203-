import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs, getJobsWithSalary } from "../Apis/network";

const JobList = ({ filterBySalary, sortOrder, selectedEmployers }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      let fetchedJobs;
      if (filterBySalary) {
        fetchedJobs = await getJobsWithSalary();
      } else {
        fetchedJobs = await getJobs();
      }

      if (selectedEmployers.length > 0) {
        fetchedJobs = fetchedJobs.filter((job) =>
          selectedEmployers.includes(job.employer)
        );
        fetchedJobs.sort((a, b) => {
          const aIndex = selectedEmployers.indexOf(a.employer);
          const bIndex = selectedEmployers.indexOf(b.employer);
          return aIndex - bIndex;
        });
      }

      if (sortOrder) {
        fetchedJobs.sort((a, b) =>
          sortOrder === "asc" ? a.id - b.id : b.id - a.id
        );
      }

      setJobs(fetchedJobs);
    };

    fetchJobs();
  }, [filterBySalary, sortOrder, selectedEmployers]);

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
