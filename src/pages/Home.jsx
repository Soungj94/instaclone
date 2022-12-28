import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import Post from "../components/PostCreate/Post";
import PostList from "../components/Home/PostList";
import CommentInput from "../components/Home/CommentInput";
import CommentShown from "../components/Home/CommentShown";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getComment } from "../redux/modules/commentSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { commentList } = useSelector((state) => state.commentPost);

  const [viewPostModal, setViewPostModal] = useState(false);

  useEffect(() => {
    dispatch(__getComment(id));
  }, [dispatch]);

  return (
    <>
      <StHome>
        <Header setViewPostModal={setViewPostModal} />
        <StPostCardList>
          <PostList />
        </StPostCardList>
        {viewPostModal && <Post setViewPostModal={setViewPostModal} />}
        <CommentInput id={id} />
        {commentList?.map((el, i) => {
          return (
            <CommentShown
              key={`main-comment-${i}`}
              id={id}
              el={el}
            ></CommentShown>
          );
        })}
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
