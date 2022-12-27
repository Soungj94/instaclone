import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { __addPost } from "../../redux/modules/mainSlice";

const Post = (props) => {
  const dispatch = useDispatch();

  //모달창 on / off
  const closeViewPostModal = () => {
    props.setViewPostModal(false);
  };

  //미리보기 구현하기 위해 이미지 데이터를 받을 스테이트
  const [imagePreview, setImagePreview] = useState([]);
  //이미지 파일 그 자체를 받을 스테이트
  const [imageFile, setImageFile] = useState(null);

  const onChangeImage = (e) => {
    setImageFile(e.target.files[0]);
    setImagePreview([]);
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            let base64Sub = base64.toString();
            setImagePreview((imagePreview) => [...imagePreview, base64Sub]);
          }
        };
      }
    }
  };

  //게시글 내용 input값 onchangehandler
  const [content, setContent] = useState("");

  const onChangeContentHandler = (e) => {
    // e.preventDefault();
    const value = e.target.value;
    setContent(value);
  };

  //등록
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", imageFile);
    dispatch(__addPost(formData));
  };
  console.log(content);
  console.log(imageFile);

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
              <StPostButton onClick={onSubmitHandler}>공유하기</StPostButton>
            </div>
          </StPostHeader>
          <StPostBody name="포스트 사진, 본문 들어갈 자리">
            <StPostImgBox>
              {imagePreview.map((item) => {
                return (
                  <StPreviewImg key="{item.id}" src={item} alt="preview" />
                );
              })}
              {/* {imageSrc && <StPreviewImg src={imageSrc} alt="preview-img" />} */}
              <input
                type="file"
                accept="image/*"
                name="post_img"
                onChange={onChangeImage}
              />
            </StPostImgBox>
            <StPostContent name="본문아이디, 텍스트 탭">
              <StNicknameArea>아이디 들어갈 자리</StNicknameArea>
              <StContentArea
                type="text"
                name="content"
                placeholder="내용을 입력해주세요"
                onChange={onChangeContentHandler}
              />
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
  border: 1px solid #bdbdbd;
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
  /* border: 1px solid red; */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StPostImgBox = styled.div`
  background-color: #fafafa;
  /* border: 1px solid white; */
  height: 500px;
  width: 500px;
  border-bottom-left-radius: 10px;
`;

const StPostContent = styled.div`
  /* border: 1px solid blue; */
  border-bottom-right-radius: 10px;

  height: 500px;
  width: 250px;
`;

const StNicknameArea = styled.div`
  /* border: 1px solid purple; */
  width: 240px;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const StContentArea = styled.input`
  width: 90%;
  border: 1px solid white;
  height: 45%;
  margin-top: 10px;
  font-size: 15px;
  padding: 10px;
  /* resize: none; */
`;
