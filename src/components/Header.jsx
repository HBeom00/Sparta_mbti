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
    <div className="bg-red-200 h-14">
      {!isAuthenticated ? (
        <div className="flex justify-between items-center h-full px-10">
          <Link to={"/"}>홈</Link>
          <Link to={"/login"}>로그인</Link>
        </div>
      ) : (
        <div className="flex justify-between items-center h-full px-10">
          <Link to={"/"}>홈</Link>
          <div className="flex gap-12">
            <Link to={"/profile"}>프로필</Link>
            <Link to={"/test"}>테스트</Link>
            <Link to={"/result"}>결과보기</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
