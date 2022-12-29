import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getPosts } from "../redux/modules/mainSlice";
import styled from "styled-components";
import Header from "../components/Home/Header";

const MyPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useSelector((state) => state.mainSlice);

  //로그인한 상태의 유저
  // dispatch, 첫 데이터 가져오기 (한번만 실행되면 좋겠다.)
  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  return (
    <PageLayout>
      <Header></Header>
      <Headerline>
        <ImgAdj src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106" />
      </Headerline>
      <NicknameStyle>{data.nickname}</NicknameStyle>
      <TopPost>게시물</TopPost>
      <TopFollower>팔로워</TopFollower>
      <TopFollowing>팔로우</TopFollowing>
      <Bottomline></Bottomline>
      <ImgBoxWrap>
        {data?.posts.map((data) => {
          return (
            <ImgBox key={data.image} data={data}>
              <img src={data.image} />
            </ImgBox>
          );
        })}
      </ImgBoxWrap>
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
  width: 76%;
  margin-top: 80px;
`;
const ImgAdj = styled.img`
  width: 150px;
  height: 150px;
  position: absolute;
  margin-left: 100px;
  margin-top: 2.4em;
`;
const NicknameStyle = styled.span`
  margin-top: 80px;
  font-size: 18px;
`;
const TopPost = styled.span`
  margin-top: 220px;
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 18px;
`;
const TopFollower = styled.span`
  margin-top: 220px;
  margin-left: 320px;
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 18px;
`;
const TopFollowing = styled.span`
  margin-top: 220px;
  margin-left: 650px;
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 18px;
`;
const Bottomline = styled.div`
  border-top: 1px solid grey;
  width: 76%;
  margin-top: 150px;
`;
const ImgBoxWrap = styled.div`
  display: flex;
  width: 1200px;
  gap: 5px;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: center;
  align-items: flex-start;
`;
const ImgBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  img {
    width: 300px;
    height: 300px;
  }
`;
export default MyPage;
