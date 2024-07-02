import React from "react";

const JobCard = ({ job }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{job.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{job.employer}</h6>
      <p className="card-text">Город: {job.area}</p>
      <p className="card-text">
        Зарплата: {job.salary ? job.salary : "Не определена"}
      </p>
      <a href={job.url} className="card-link">
        Больше информации
      </a>
    </div>
  </div>
);

export default JobCard;
