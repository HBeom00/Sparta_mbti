import axios from "axios";

const Glich_API_URL = import.meta.env.VITE_MBTI_URL;

export const getTestResults = async () => {
  const response = await axios.get(Glich_API_URL);
  console.log(response, "response");
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await axios.post(Glich_API_URL, resultData);
  return response.data;
};

export const deleteTestResult = async (id) => {
  await axios.delete(`${Glich_API_URL}/${id}`);
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  await axios.patch(`${Glich_API_URL}/${id}`, {
    visibility: !visibility,
  });
};
