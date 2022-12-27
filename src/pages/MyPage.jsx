import React from "react";
import styled from "styled-components";

const MyPage = () => {
  return (
    <PageLayout>
      <Headerline>
        <ImgAdj src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106" />
      </Headerline>
      <NicknameStyle>Nickname</NicknameStyle>
      <TopPost>게시물</TopPost>
      <TopFollower>팔로워</TopFollower>
      <TopFollowing>팔로우</TopFollowing>
      <Bottomline></Bottomline>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  width: 1200px;
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;
const Headerline = styled.div`
  border-top: 3px solid grey;
  width: 90%;
  margin-top: 80px;
`;
const ImgAdj = styled.img`
  width: 180px;
  height: 180px;
  position: absolute;
  margin-left: 100px;
  margin-top: 50px;
`;
const NicknameStyle = styled.span`
  margin-top: 80px;
  font-size: 30px;
`;
const TopPost = styled.span`
  margin-top: 250px;
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 25px;
`;
const TopFollower = styled.span`
  margin-top: 250px;
  margin-left: 320px;
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 25px;
`;
const TopFollowing = styled.span`
  margin-top: 250px;
  margin-left: 650px;
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 25px;
`;
const Bottomline = styled.div`
  border-top: 1px solid grey;
  width: 90%;
  margin-top: 150px;
`;
export default MyPage;
