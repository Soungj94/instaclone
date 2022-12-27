import React from "react";
import styled from "styled-components";

const PostCard = () => {
  return (
    <StPostCard name="포스트카드 전체">
      <StPostCardHeader name="포스트 카드 헤더">
        <StNicknameBox>
          <StProfileImg alt="프로필 이미지" src="img/profile_img.png" />
          <div>닉네임 들어갈 자리</div>
        </StNicknameBox>
        <StButtonBox>
          <StButton>수정</StButton>
          <StButton>삭제</StButton>
        </StButtonBox>
      </StPostCardHeader>
      <StPostCardBody name="포스트카드 바디">
        <StPostImg alt="본 게시글 이미지" src="" />
        <div name="좋아요 댓글 이미지버튼 들어갈 자리">
          <StHeartImg alt="좋아요 아이콘" src="img/noheart_img.png" />
          {/* <StCommentImg alt="댓글 아이콘" src="img/comment_img.png" /> */}
        </div>
        <div name="댓글 컴포넌트 들어갈 자리">
          댓글 컴포넌트 들어갈 자리
          {/* <Comment /> <- 이런 식으로*/}
        </div>
      </StPostCardBody>
    </StPostCard>
  );
};

export default PostCard;

// const StCommentImg = styled.img`
//   width: 25px;
// `;

const StHeartImg = styled.img`
  width: 25px;
`;

const StPostImg = styled.img`
  width: 500px;
`;

const StButton = styled.button`
  background-color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: #0095f6;
`;

const StButtonBox = styled.div`
  display: flex;
  gap: 5px;
`;

const StNicknameBox = styled.div`
  display: flex;
  justify-content: row;
  gap: 5px;
`;

const StProfileImg = styled.img`
  width: 25px;
  height: 25px;
`;

const StPostCardHeader = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  height: 50px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const StPostCardBody = styled.div`
  border: 1px solid black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const StPostCard = styled.div`
  background-color: white;
  border: 1px solid orange;
  border-radius: 10px;
  width: 465px;
`;
