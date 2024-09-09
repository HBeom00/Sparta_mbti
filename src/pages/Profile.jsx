import { useState } from "react";
import { updateProfile } from "../api/auth";

const Profile = () => {
  const [chname, setChname] = useState("");

  const handleChangeName = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", chname);

      // const response = await axios.patch(
      //   "https://moneyfulpublicpolicy.co.kr/profile",
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await updateProfile(formData, token);
      console.log(response, "변경 확인 값");
      if (response.success) {
        alert(`닉네임이 ${response.nickname}으로 변경되었습니다.`);
      }
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleChangeName}>
      <p>프로필 수정</p>
      <div>
        <label>닉네임</label>
        <input
          type="text"
          value={chname}
          placeholder="변경할 닉네임 입력란"
          onChange={(e) => setChname(e.target.value)}
        />
      </div>
      <button>프로필 업데이트</button>
    </form>
  );
};

export default Profile;
