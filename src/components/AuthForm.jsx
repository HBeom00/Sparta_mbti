import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authLogin, authRegister } from "../api/auth";

const AuthForm = ({ mode }) => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 로그인 기능
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "https://moneyfulpublicpolicy.co.kr/login",
      //   {
      //     id: userId,
      //     password: userPw,
      //   }
      // );
      const response = await authLogin({
        id: userId,
        password: userPw,
      });

      if (response.success) {
        login(response.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log("login error:", error);
      alert("로그인 실패");
    }
  };

  // 회원가입 기능
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "https://moneyfulpublicpolicy.co.kr/register",
      //   {
      //     id: userId,
      //     password: userPw,
      //     nickname: nickName,
      //   }
      // );
      const response = await authRegister({
        id: userId,
        password: userPw,
        nickname: nickName,
      });

      if (response.success) {
        alert(response.message);
        navigate("/login");
      } else alert("회원가입 실패");

      setUserId("");
      setUserPw("");
      setNickName("");
    } catch (error) {
      console.log("signUp error:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div>
      {mode === "login" ? (
        <form onSubmit={handleSubmitLogin}>
          <input
            type="text"
            value={userId}
            placeholder="아이디"
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            value={userPw}
            placeholder="비밀번호"
            onChange={(e) => setUserPw(e.target.value)}
          />
          <button>로그인</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitSignup}>
          <input
            type="text"
            value={userId}
            placeholder="아이디"
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            value={userPw}
            placeholder="비밀번호"
            onChange={(e) => setUserPw(e.target.value)}
          />
          <input
            type="text"
            value={nickName}
            placeholder="닉네임"
            onChange={(e) => setNickName(e.target.value)}
          />
          <button>회원가입</button>
        </form>
      )}
    </div>
  );
};
export default AuthForm;
