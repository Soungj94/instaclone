import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPosts } from "../../redux/modules/mainSlice";
import PostCard from "./PostCard";

//등록된 글들을 map으로 뿌려주는 컴포넌트
const PostList = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.mainSlice);
  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  const { data } = useSelector((state) => state.mainSlice);
  
  return (
    <StPostList>
      {data?.posts.map((item) => {
        return <PostCard key={item.postId} data={item} />;
      })}
    </StPostList>
  );
};

export default PostList;

const StPostList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
