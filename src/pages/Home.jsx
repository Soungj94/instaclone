import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import Post from "../components/PostCreate/Post";
import PostList from "../components/Home/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { __getPosts } from "../redux/modules/mainSlice";
import { __tokenCheck } from "../redux/modules/profileSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [viewPostModal, setViewPostModal] = useState(false);


  useEffect(() => {
    dispatch(__tokenCheck());
  }, [dispatch]);

  return (
    <>
      <StHome>
        <Header setViewPostModal={setViewPostModal} />
        <StPostCardList>
          <PostList />
        </StPostCardList>
        {viewPostModal && <Post setViewPostModal={setViewPostModal} />}
      </StHome>
    </>
  );
};

export default Home;

const StHome = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
`;

const StPostCardList = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto 0 auto;
  /* align-items: center; */
`;
