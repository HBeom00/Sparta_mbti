import axios from "axios";
// import { createTestResult } from "../api/testResult";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";

const Test = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);

    // const data = await axios.get("https://moneyfulpublicpolicy.co.kr/user", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const data = await getUserProfile(token);
    console.log(data, "data 값 확인");
    const resultData = {
      userId: data.id,
      nickname: data.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    // await createTestResult(resultData);
    const response = await axios.post(
      "http://localhost:5000/testResults",
      resultData
    );
    console.log(response, "response 확인");
    navigate("/result");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  );
};

export default Test;
