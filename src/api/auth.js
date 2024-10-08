import axios from "axios";

const API_URL = import.meta.env.VITE_AUTH_URL;

// 회원가입
export const authRegister = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 로그인
export const authLogin = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// 유저 정보 가져오기
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 유저 정보 수정
export const updateProfile = async (formData, token) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
