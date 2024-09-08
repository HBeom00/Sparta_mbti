import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const moveTestPage = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div>
      <p>무료 성격 테스트</p>
      <p>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      <div>
        <div>
          <p>성격 유형 검사</p>
          <p>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </div>
        <div>
          <p>성격 유형 이해</p>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.
          </p>
        </div>
        <div>
          <p>팀 평가</p>
          <p>
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </div>
      </div>
      <button onClick={moveTestPage}>내 성격 알아보러 가기</button>
    </div>
  );
};

export default Home;
