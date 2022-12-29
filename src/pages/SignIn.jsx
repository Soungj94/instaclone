import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postLogin } from "../redux/modules/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //input state 초기값
  const [account, setAccount] = useState({ email: "", password: "" });

  //input 이벤트 핸들러
  const onChangeAccount = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  //submit 이벤트 핸들러
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__postLogin(account));
  };

  return (
    <StWarp>
      <StLoginWrap>
        <StImg>
          <img src="/img/phone.png" alt="" />
          <StImgGif>
            <img src="/img/screenshot1.gif" alt="" />
          </StImgGif>
        </StImg>

        <div>
          <Stbox>
            <img src="/img/logo_img.png" alt=""></img>
            <form>
              <label>이메일</label>
              <input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                onChange={onChangeAccount}
              ></input>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 작성해주세요."
                onChange={onChangeAccount}
              ></input>
              <button onClick={loginSubmitHandler}>로그인</button>
            </form>
          </Stbox>
          <Stbox1>
            <span>계정이 없으신가요?</span>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              가입하기
            </button>
          </Stbox1>
        </div>
      </StLoginWrap>
    </StWarp>
  );
};

export default SignIn;

const StWarp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 0.8em;
`;

const StLoginWrap = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    input {
      all: unset;
      width: 260px;
      height: 36px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      margin: 6px;
      background-color: #fafafa;
    }
    button {
      border: 0;
      width: 266px;
      height: 38px;
      background-color: #0095f6;
      border-radius: 5px;
      margin: 6px;
      color: white;
    }
  }
`;
const Stbox = styled.div`
  border: 1px solid #e0e0e0;
  padding: 25px 25px;
  background-color: white;
  flex-direction: column;
  margin: 10px;
  button {
    font-weight: 900;
    cursor: pointer;
  }
  img {
    width: 200px;
    display: block;
    margin: 0px auto;
  }
`;
const Stbox1 = styled.div`
  border: 1px solid #e0e0e0;
  padding: 22px 25px;
  background-color: white;
  margin: 10px;
  text-align: center;
  button {
    all: unset;
    color: #0095f6;
    font-weight: 700;
    padding-left: 8px;
    cursor: pointer;
  }
`;

const StImg = styled.div`
  position: relative;
`;
const StImgGif = styled.div`
  position: absolute;
  left: 156px;
  top: 28px;
`;
