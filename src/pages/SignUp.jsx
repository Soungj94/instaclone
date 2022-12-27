import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __signUp } from "../redux/modules/userSlice";
import { __postDupEmail, __postDupNickname } from "../redux/modules/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailText, setEmailText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmText, setConfirmText] = useState("");

  //input state 초기값
  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  });

  //유효성 input state 초기값
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isNickname: false,
    isPassword: false,
    isConfirm: false,
  });

  //정규식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const nickRegExp = /^[A-Za-z0-9]{1,}$/;
  const pwRegExp = /^[A-Za-z0-9]{4,}$/;

  //input 이벤트 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    //email 유효성 검사
    if (name === "email") {
      if (!emailRegExp.test(value)) {
        //emaill 형식이 맞지 않을때
        setEmailText("이메일을 확인해주세요");
        setIsValid({ ...isValid, isEmail: false });
      } else {
        setEmailText("");
        setIsValid({ ...isValid, isEmail: true });
      }
    }
    //nickname 유효성 검사
    if (name === "nickname") {
      if (!nickRegExp.test(value)) {
        //nickname 형식이 맞지 않을때
        setNicknameText("영문과 숫자 혼합하여 작성해주세요");
        setIsValid({ ...isValid, isNickname: false });
      } else {
        setNicknameText("");
        setIsValid({ ...isValid, isNickname: true });
      }
    }

    //password 유효성 검사
    if (name === "password") {
      if (!pwRegExp.test(value)) {
        //비밀번호의 길이(length)가 4글자 이하일 때
        setPasswordText("4글자 이상 작성해주세요.");
        setIsValid({ ...isValid, isPassword: false });
      } else {
        setPasswordText("");
        setIsValid({ ...isValid, isPassword: true });
      }
    }
    //password 확인 유효성 검사
    if (name === "confirm") {
      if (input.password !== value) {
        //password의 값과 같지 않을때
        setConfirmText("비밀번호가 일치하지 않습니다.");
        setIsValid({ ...isValid, isConfirm: false });
      } else {
        setConfirmText("");
        setIsValid({ ...isValid, isConfirm: true });
      }
    }
  };

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      __signUp({
        email: input.email,
        nickname: input.nickname,
        password: input.password,
        confirm: input.confirm,
      })
    );
    alert("회원가입 완료");
    navigate("/signin");
  };

  //email 중복확인
  const dupEmail = () => {
    dispatch(__postDupEmail({ email: input.email }));
  };

  //nickname 중복확인
  const dupNickname = () => {
    dispatch(__postDupNickname({ nickname: input.nickname }));
  };

  return (
    <StWarp>
      <Stupwrap>
        <div>
          <div>
            <img src="/img/logo_img.png" alt=""></img>
          </div>
          <p>친구들의 사진과 동영상을 보려면 가입하세요.</p>
        </div>
        <form onSubmit={submitHandler}>
          <CheckWrap>
            <label></label>
            <input
              name="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeHandler}
              value={input.email}
            ></input>
            <CheckButton onClick={dupEmail}>중복확인</CheckButton>
          </CheckWrap>
          <span>{emailText}</span>
          <CheckWrap>
            <label></label>
            <input
              name="nickname"
              type="text"
              placeholder="영문과 숫자를 혼합하여 입력해 주세요."
              onChange={onChangeHandler}
              value={input.nickname}
            ></input>
            <CheckButton onClick={dupNickname}>중복확인</CheckButton>
          </CheckWrap>
          <span>{nicknameText}</span>
          <label></label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호는 4글자 이상으로 입력해 주세요."
            onChange={onChangeHandler}
            value={input.password}
          ></input>
          <span>{passwordText}</span>
          <label></label>
          <input
            name="confirm"
            type="password"
            placeholder="다시 한번 입력해 주세요."
            onChange={onChangeHandler}
            value={input.confirm}
          ></input>
          <span>{confirmText}</span>
          <button
            disabled={
              !(
                isValid.isEmail &&
                isValid.isNickname &&
                isValid.isPassword &&
                isValid.isConfirm
              )
            }
          >
            가입
          </button>
        </form>
      </Stupwrap>
      <Stbox1>
        <span>계정이 있으신가요?</span>
        <button
          onClick={() => {
            navigate("/signin");
          }}
        >
          로그인
        </button>
      </Stbox1>
    </StWarp>
  );
};

export default SignUp;

const StWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 0.8em;
  p {
    width: 200px;
    text-align: center;
    margin: 0 auto;
    color: #999;
    font-size: 1.3em;
    font-weight: 800;
  }
`;

const Stupwrap = styled.div`
  width: 350px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background-color: white;
  padding: 40px 0;
  img {
    width: 200px;
    display: block;
    margin: 0px auto;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    input {
      all: unset;
      width: 100%;
      height: 36px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      margin: 6px;
      background-color: #fafafa;
    }
    span {
      display: flex;
      flex-direction: column;
      color: red;
      font-size: 12px;
      margin: 0px 6px;
    }
    button {
      border: 0;
      width: 100%;
      height: 38px;
      background-color: #0095f6;
      border-radius: 5px;
      margin: 6px;
      color: white;
      cursor: pointer;
      &:disabled {
        cursor: default;
        opacity: 0.5;
        background-color: #808080;
      }
    }
  }
`;
const CheckWrap = styled.div`
  display: flex;
  align-items: center;
`;
const CheckButton = styled.div`
  width: 76px;
  height: 36px;
  border-radius: 5px;
  text-align: center;
  line-height: 36px;
  background-color: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
`;
const Stbox1 = styled.div`
  display: block;
  width: 350px;
  padding: 20px 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  margin: 10px auto;
  button {
    all: unset;
    color: #0095f6;
    font-weight: 900;
    padding-left: 8px;
    cursor: pointer;
  }
`;
