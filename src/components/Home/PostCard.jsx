import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { __deletePost } from "../../redux/modules/mainSlice";
import { __tokenCheck } from "../../redux/modules/profileSlice";
import Update from "../Home/Update";

const PostCard = ({ data }) => {
  const dispatch = useDispatch();

  //수정하기(업데이트) 모달창 on
  const [updateModal, setUpdateModal] = useState(false);
  const showUpdateModal = () => {
    // if(data.userId !== )
    setUpdateModal(true);
  };

  const deletePostHandler = (payload) => {
    dispatch(__deletePost(payload));
  };

  return (
    <StPostCard name="포스트카드 전체">
      {updateModal && <Update setUpdateModal={setUpdateModal} data={data} />}
      <StPostCardHeader name="포스트 카드 헤더">
        <StNicknameBox>
          <StProfileImg alt="프로필 이미지" src={data.profileImg} />
          <div>{data.nickname}</div>
        </StNicknameBox>
        <StButtonBox>
          <StButton onClick={showUpdateModal}>수정</StButton>
          <StButton
            onClick={() => {
              deletePostHandler(data.postId);
            }}
          >
            삭제
          </StButton>
        </StButtonBox>
      </StPostCardHeader>
      <StPostCardBody name="포스트카드 바디">
        <StPostImg alt="본 게시글 이미지" src={data.image} />
        <StHeartImgContainer name="좋아요 댓글 이미지버튼 들어갈 자리">
          <StHeartImg alt="좋아요 아이콘" src="img/noheart_img.png" />
          <StLikeCount>{data.likeCount}</StLikeCount>
          {/* <StCommentImg alt="댓글 아이콘" src="img/comment_img.png" /> */}
        </StHeartImgContainer>
        <StContent>{data.content}</StContent>
        <div name="댓글 컴포넌트 들어갈 자리">
          댓글 컴포넌트 들어갈 자리
          {/* <Comment /> <- 이런 식으로*/}
        </div>
      </StPostCardBody>
    </StPostCard>
  );
};

export default PostCard;

const LoadEffect = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const StPostCard = styled.div`
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  width: 465px;
  animation: ${LoadEffect} 0.4s ease-in-out;
`;

const StPostCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  height: 50px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const StNicknameBox = styled.div`
  display: flex;
  justify-content: row;
  gap: 5px;
`;

const StProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 15px;
`;

const StButtonBox = styled.div`
  display: flex;
  gap: 5px;
`;

const StButton = styled.button`
  background-color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: #0095f6;
`;

const StPostCardBody = styled.div`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StPostImg = styled.img`
  width: 465px;
`;

const StHeartImgContainer = styled.div`
  height: 25px;
  margin: 0 10px 0 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StHeartImg = styled.img`
  width: 25px;
  height: 25px;
`;

const StLikeCount = styled.span`
  font-size: 24px;
  display: flex;
  align-items: center;
`;

const StContent = styled.div`
  margin: 0 10px 0 10px;
  height: 30px;
  display: flex;
  align-items: center;
`;
