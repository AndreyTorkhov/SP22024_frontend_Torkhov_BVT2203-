import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs/`);
  return response.data;
};

export const getJobsWithSalary = async () => {
  const response = await axios.get(`${API_URL}/jobs/salary/`);
  return response.data;
};

export const getSortedJobs = async (order) => {
  const response = await axios.get(`${API_URL}/jobs/sort/`, {
    params: { order },
  });
  return response.data;
};

export const getFilteredJobs = async (employers) => {
  const response = await axios.get(`${API_URL}/jobs/filter/`, {
    params: { employers },
  });
  return response.data;
};

export const getUniqueEmployers = async () => {
  const response = await axios.get(`${API_URL}/jobs/employers/`);
  return response.data;
};

export const getAccreditedJobs = async (accredited) => {
  const response = await axios.get(`${API_URL}/jobs/accredited/`, {
    params: { accredited },
  });
  return response.data;
};

export const getJobsBySchedule = async (schedule_names) => {
  const response = await axios.get(`${API_URL}/jobs/schedule/`, {
    params: { schedule_names },
  });
  return response.data;
};

export const getUniqueSchedules = async () => {
  const response = await axios.get(`${API_URL}/jobs/schedules/`);
  return response.data;
};
