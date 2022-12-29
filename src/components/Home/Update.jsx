import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { __updatePost } from "../../redux/modules/mainSlice";

const Update = ({ setUpdateModal, posts }) => {
  const dispatch = useDispatch();
  //수정하기(업데이트) 모달창  off
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const [updateContent, setUpdateContent] = useState("");
  const onChangeUpdateContentHandler = (e) => {
    const value = e.target.value;
    setUpdateContent(value);
  };

  const updateHandler = () => {
    const payload = {
      id: posts.postId,
      content: updateContent,
    };
    dispatch(__updatePost(payload));
    setUpdateModal(false);
  };

  return (
    <>
      <StUpdateAll onClick={closeUpdateModal}>
        <StUpdateContainer
          //propagation써서 부모 태그에게 이벤트 전파막음
          onClick={(event) => event.stopPropagation()}
          name="포스트 전체 랩"
        >
          <StUpdateHeader name="포스트 헤더 탭">
            <div name="뒤로가기버튼">
              <StImg
                alt="go main button"
                src="img/back.png"
                onClick={closeUpdateModal}
              />
            </div>
            <StUpdateHeaderText>게시글 수정</StUpdateHeaderText>
            <div>
              <StUpdateButton onClick={updateHandler}>수정하기</StUpdateButton>
            </div>
          </StUpdateHeader>
          <StUpdateBody name="포스트 사진, 본문 들어갈 자리">
            <StUpdateImgBox>
              <StPreviewImg alt="업데이트박스 이미지" src={posts.image} />
            </StUpdateImgBox>
            <StUpdateContent name="본문아이디, 텍스트 탭">
              <StNicknameArea>{posts.nickname}</StNicknameArea>
              <StTextArea
                type="text"
                name="updateContent"
                defaultValue={posts.content}
                onChange={onChangeUpdateContentHandler}
              ></StTextArea>
            </StUpdateContent>
          </StUpdateBody>
        </StUpdateContainer>
      </StUpdateAll>
    </>
  );
};

export default Update;

const StUpdateAll = styled.div`
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
const StUpdateContainer = styled.div`
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

const StUpdateHeaderText = styled.div`
  font-weight: bold;
`;

const StUpdateButton = styled.button`
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

const StUpdateHeader = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: white;
  display: flex;
  height: 40px;
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: space-between;
`;

const StUpdateBody = styled.div`
  background-color: white;
  justify-content: space-between;
  display: flex;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StUpdateImgBox = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  width: 500px;
  border-bottom-left-radius: 10px;
`;

const StUpdateContent = styled.div`
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
