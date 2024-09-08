import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>홈</Link>
          <Link to={"/login"}>로그인</Link>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>홈</Link>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={"/profile"}>프로필</Link>
            <Link to={"/test"}>테스트</Link>
            <Link to={"/testresult"}>결과보기</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
