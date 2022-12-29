import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getMyPost } from "../../redux/modules/profileSlice";
import { deleteCookie, getCookie } from "../../shared/cookie";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //로그인, 비로그인(쿠키속 토큰의 유무) 에 따라서 헤더 모양 달라지게 하기 위해 가져온 토큰
  const token = getCookie("token");

  const res = useSelector((state) => state.profileSlice.user);
  //모달창 on 하는 함수
  const showViewPostModal = () => {
    props.setViewPostModal(true);
  };

  //로그아웃
  const logOut = () => {
    deleteCookie("token");
    window.location.reload();
  };

  const goMyPage = () => {
    navigate(`/mypage/${res.data.nickname}`);
    dispatch(__getMyPost(res.data.nickname));
  };

  return (
    <>
      <StHeaderWrap>
        <div name="menu별스타그램아이콘">
          <StLogo alt="별스타그램아이콘" src="img/logo_img.png" />
        </div>
        <StHeadMenu>
          <StImgTextWrap name="headerwrap">
            <StImgWrap
              name="home icon & 홈"
              onClick={() => {
                navigate("/");
              }}
            >
              <StImg alt="home buttom icon" src="img/home_img.png" />
              <div>홈</div>
            </StImgWrap>
            {token ? (
              <StImgWrap
                name="create icon & 만들기"
                onClick={showViewPostModal}
              >
                <StImg alt="만들기용 + 아이콘" src="img/article_img.png" />
                <div>만들기</div>
              </StImgWrap>
            ) : null}
            {token ? (
              <StImgWrap name="profile icon & 프로필" onClick={goMyPage}>
                <StImg alt="profile icon" src="img/profile_img.png" />
                <div>프로필</div>
              </StImgWrap>
            ) : null}
          </StImgTextWrap>
          {/* 토큰 유무에 따라 로그인/로그아웃 버튼 보여주는 태그 */}
          <StLogInOutWrap>
            {token ? (
              <StLogInOutTextWrap name="로그아웃 아이콘" onClick={logOut}>
                <StImg alt="로그아웃 아이콘" src="img/logout.png" />
                <div>로그아웃</div>
              </StLogInOutTextWrap>
            ) : (
              <StLogInOutTextWrap
                name="로그인 아이콘"
                onClick={() => navigate("/signin")}
              >
                <StImg alt="로그인 아이콘" src="img/login.png" />
                <div>로그인</div>
              </StLogInOutTextWrap>
            )}
          </StLogInOutWrap>
        </StHeadMenu>
      </StHeaderWrap>
    </>
  );
};

export default Header;

const StHeaderWrap = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  z-index: 100;
`;

const StLogo = styled.img`
  width: 150px;
`;

const StHeadMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95vh;
  gap: 50px;
  margin: 20px 0 0 0px;
  justify-content: space-between;
`;

const StImgTextWrap = styled.div`
  margin: 0 10px 0 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StImgWrap = styled.div`
  border-radius: 15px;
  height: 35px;
  align-items: center;
  padding: 0 0 0 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  &:hover {
    background-color: whitesmoke;
    transform: scale(1.02);
    font-size: 17px;
  }
  &:active {
    transform: scale(0.98);
    font-size: 15px;
  }
`;

const StImg = styled.img`
  width: 25px;
  height: 25px;
`;

const StLogInOutWrap = styled.div`
  margin-bottom: 50px;
`;

const StLogInOutTextWrap = styled.div`
  width: 230px;
  border-radius: 15px;
  height: 35px;
  align-items: center;
  padding: 0 0 0 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  &:hover {
    background-color: whitesmoke;
    transform: scale(1.02);
    font-size: 17px;
  }
  &:active {
    transform: scale(0.98);
    font-size: 15px;
  }
`;
