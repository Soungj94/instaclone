import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // //나중에 프로필페이지에서 사진 누르면 디테일 모달창 띄워줄 코드
  // const [showDetailModal, setShowDetailModal] = useState(false)
  // const onClickShowDetailModal = () => {
  //   setShowDetailModal(true)
  // }

  // //프로필페이지의 요소들에게 붙여줘야할 디테일모달창 닫기버튼 코드
  // const closeDetailModal = () => {
  //   setShowDetailModal(false)
  // }

  return (
    <>
      <StDetailAll /*onClick={closeDetailModal}*/>
        <StDetailContainer
          //propagation써서 부모 태그에게 이벤트 전파막음
          onClick={(event) => event.stopPropagation()}
          name="포스트 전체 랩"
        >
          <StDetailHeader name="포스트 헤더 탭">
            <div name="뒤로가기버튼">
              <StImg
                alt="go main button"
                src="img/back.png"
                // onClick={closeDetailModal}
              />
            </div>
            <StDetailHeaderText>게시글 수정</StDetailHeaderText>
            <div>
              <StDetailButton /*onClick={updateHandler}*/>수정</StDetailButton>
              <StDetailButton /*onClick={updateHandler}*/>삭제</StDetailButton>
            </div>
          </StDetailHeader>
          <StDetailBody name="포스트 사진, 본문 들어갈 자리">
            <StDetailImgBox>
              <StPreviewImg alt="업데이트박스 이미지" /*src={data.image}*/ />
            </StDetailImgBox>
            <StDetailContent name="본문아이디, 텍스트 탭">
              <StNicknameArea>내 게시글 내 닉네임 들어갈 자리</StNicknameArea>
              <StTextArea
                type="text"
                name="updateContent"
                // defaultValue={data.content}
                // onChange={onChangeUpdateContentHandler}
              ></StTextArea>
            </StDetailContent>
          </StDetailBody>
        </StDetailContainer>
      </StDetailAll>
    </>
  );
};

export default PostDetail;

const StDetailAll = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

//모달창 뜰 때 fade in
const LoadEffect = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

//업데이트 모달창을 화면 중앙 최상단에 노출
const StDetailContainer = styled.div`
  border-radius: 10px;
  width: 750px;
  /* height: 545px; */
  //모달창 중앙배치
  position: absolute;
  top: 50%;
  left: 56%;
  transform: translate(-50%, -50%);
  animation: ${LoadEffect} 0.3s ease-in-out;
`;

const StDetailHeaderText = styled.div`
  font-weight: bold;
`;

const StDetailButton = styled.button`
  background-color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: #0095f6;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const StPreviewImg = styled.img`
  width: 500px;
`;

const StImg = styled.img`
  width: 25px;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const StDetailHeader = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: white;
  display: flex;
  height: 40px;
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: space-between;
`;

const StDetailBody = styled.div`
  background-color: white;
  justify-content: space-between;
  display: flex;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StDetailImgBox = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  width: 500px;
  border-bottom-left-radius: 10px;
`;

const StDetailContent = styled.div`
  border-bottom-right-radius: 10px;
  height: 500px;
  width: 250px;
`;

const StNicknameArea = styled.div`
  padding-left: 10px;
  width: 240px;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const StTextArea = styled.textarea`
  border: none;
  width: 90%;
  height: 85%;
  margin-top: 10px;
  font-size: 15px;
  padding: 10px;
  resize: none;
`;
