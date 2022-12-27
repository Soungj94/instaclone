import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PostCard from "./PostCard";

// 내가 등록한 글들을 나열해주는 컴포넌트
const PostList = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(__getPosts());
  // }, [dispatch]);

  return <PostCard />;
};

export default PostList;
