import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Post = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //모달창 on / off
  const closeViewPostModal = () => {
    props.setViewPostModal(false);
  };

  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileblob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileblob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onChangeImage = (e) => {
    encodeFileToBase64(e.target.files[0]);
    const img = e.target.file[0];
    const formData = new FormData();
    formData.append("image", img);
  };

  return (
    <>
      <StPostAll onClick={closeViewPostModal}>
        <StPostContainer
          //propagation쓰면 부모 태그에게 이벤트 전파막음
          onClick={(event) => event.stopPropagation()}
          name="포스트 전체 랩"
        >
          <StPostHeader name="포스트 헤더 탭">
            <div name="뒤로가기버튼">
              <StImg
                alt="go main button"
                src="img/back.png"
                onClick={closeViewPostModal}
              />
            </div>
            <StPostHeaderText>새 게시물 만들기</StPostHeaderText>
            <div>
              <StPostButton>공유하기</StPostButton>
            </div>
          </StPostHeader>
          <StPostBody name="포스트 사진, 본문 들어갈 자리">
            <StPostImgBox>
              {imageSrc && <StPreviewImg src={imageSrc} alt="preview-img" />}
              <input
                type="file"
                accept="image/*"
                name="post_img"
                onChange={onChangeImage}
              />
            </StPostImgBox>
            <StPostContent name="본문아이디, 텍스트 탭">
              <StNicknameArea>아이디 들어갈 자리</StNicknameArea>
              <StTextArea>본문 들어갈 자리</StTextArea>
            </StPostContent>
          </StPostBody>
        </StPostContainer>
      </StPostAll>
    </>
  );
};

export default Post;

const StPostAll = styled.div`
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

//모달창을 화면 중앙 최상단에 노출
const StPostContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 750px;
  height: 545px;
  //모달창 중앙배치
  position: absolute;
  top: 50%;
  left: 56%;
  transform: translate(-50%, -50%);
  animation: ${LoadEffect} 0.3s ease-in-out;
`;

const StPostHeaderText = styled.div`
  font-weight: bold;
`;

const StPostButton = styled.button`
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

const StPostHeader = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: white;
  display: flex;
  height: 40px;
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: space-between;
`;

const StPostBody = styled.div`
  background-color: white;

  justify-content: space-between;
  display: flex;
  border: 1px solid red;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StPostImgBox = styled.div`
  border: 1px solid white;
  height: 500px;
  width: 500px;
  border-bottom-left-radius: 10px;
`;

const StPostContent = styled.div`
  border: 1px solid blue;
  border-bottom-right-radius: 10px;

  height: 500px;
  width: 250px;
`;

const StNicknameArea = styled.div`
  border: 1px solid purple;
  width: 240px;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const StTextArea = styled.textarea`
  width: 90%;
  border: 1px solid orange;
  height: 85%;
  margin-top: 10px;
  font-size: 15px;
  padding: 10px;
  resize: none;
`;
