import axios from "axios";

const BASE_URL = "http://localhost:5000/api";


// ================= AUTH =================

export const signup = (data) => {
  return axios.post(`${BASE_URL}/auth/signup`, data);
};

export const login = (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};

export const getProfile = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const putProfile = (data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${BASE_URL}/profile/update  `,data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const start = () => {
  console.log("in api");
  const token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/interview/start  `, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const nextQuestion = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${BASE_URL}/interview/next  `, data,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const end = (interviewId) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${BASE_URL}/interview/end`,
    {
      interviewId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getHistory = () => {
  const token = localStorage.getItem("token");

  return axios.get(
    `${BASE_URL}/interview/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getDashboard = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${BASE_URL}/interview/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};