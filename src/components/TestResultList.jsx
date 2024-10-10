import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from "../api/testResult";
import TestResultItem from "./TestResultItem.jsx";
import { useState } from "react";
import { getUserProfile } from "../api/auth.js";

const TestResultList = () => {
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState("");

  // 데이터 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["mbti"],
    queryFn: getTestResults,
  });

  // 데이터 삭제
  const { mutate: deleteResult } = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["mbti"]);
    },
  });

  // 데이터 비공개
  const { mutate: updateResult } = useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries(["mbti"]);
    },
  });

  if (isPending) return <div>로딩중 입니다.</div>;
  if (isError) return <div>로딩중 에러가 발견되었습니다.</div>;

  // 유저 정보 가져오기
  async function getUserInfo() {
    const token = localStorage.getItem("accessToken");
    const data = await getUserProfile(token);
    setUserInfo(data.id);
  }
  getUserInfo();

  const filterData = data.filter(
    (el) => el.userId === userInfo || el.visibility === true
  );

  return (
    <>
      {filterData.map((el) => {
        return (
          <TestResultItem
            key={el.id}
            el={el}
            updateResult={updateResult}
            deleteResult={deleteResult}
            userInfo={userInfo}
          />
        );
      })}
    </>
  );
};

export default TestResultList;
