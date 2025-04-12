import React, { ChangeEvent, useState } from "react";

const LoginPanel = ({ onLogin }: { onLogin: (loginInfo: { id: string; password: string; code: string }) => void }) => {
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
    code: "",
  });

  // HTML  태그 뒤에 Element
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((info) =>  ({ ...info, [e.target.name]: e.target.value })); // 기존 : id:ab password:def code:ij, 새로 :id:ab password:def code:ijk
  };

  const onSubmit = () => {
    onLogin(loginInfo);
  };

  return (
    <div>
      <div className="login-box">
        <h2 className="login-title">로그인</h2>
        <form>
          <div className="input-group">
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" name="id" onChange={onChange} value={loginInfo.id} />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" onChange={onChange} value={loginInfo.password} />
          </div>

          <div className="input-group">
            <label htmlFor="code">코드</label>
            <input type="text" id="code" name="code" onChange={onChange} value={loginInfo.code} />
          </div>
          <button onClick={onSubmit} type="button" className="login-button">
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPanel;
