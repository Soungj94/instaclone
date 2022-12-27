import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { __postComment } from "../redux/modules/commentSlice";

import Header from "../components/Home/Header";
import Post from "../components/PostCreate/Post";
import PostList from "../components/Home/PostList";

const Home = () => {
  const [viewPostModal, setViewPostModal] = useState(false);

  const dispatch = useDispatch();
  const [inputC, setInputC] = useState({ comment: "" });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputC({ ...inputC, [name]: value });
  };
  useEffect(() => {}, [dispatch]);

  const onClickInputHandler = () => {
    dispatch(__postComment({ comment: inputC.comment }));
  };

  return (
    <>
      <StHome>
        <Header setViewPostModal={setViewPostModal} />
        <StPostCardList>
          <PostList />
        </StPostCardList>
        {viewPostModal && <Post setViewPostModal={setViewPostModal} />}
        <div>
          <input
            type="text"
            name="comment"
            placeholder="댓글 달기..."
            onChange={inputChangeHandler}
          ></input>
          <button type="button" onClick={onClickInputHandler}>
            게시
          </button>
        </div>
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
