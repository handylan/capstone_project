import "./MainPage.css";
import { useNavigate } from "react-router";
import LoginPanel from "./LoginPanel";
import { axiosInstance } from "../../api";
const MainPage = () => {
  const navigate = useNavigate();

  const onLogin = async ({ id, password, code }: { id: string; password: string; code: string }) => {
    // 서버에 로그인 정보 전송
    // 성공시 onSuccess
    await axiosInstance.post(
      "/",
      { id, password, code },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    navigate("/device");
  };

  return (
    <div className="layout-login">
      <div className="container">
        <h1 className="title">스마트 안전모</h1>
        <LoginPanel onLogin={onLogin} />
      </div>
    </div>
  );
};

export default MainPage;
