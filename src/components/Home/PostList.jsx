import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPosts } from "../../redux/modules/mainSlice";
import PostCard from "./PostCard";

//등록된 글들을 map으로 뿌려주는 컴포넌트
const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.mainSlice);
  console.log("🚀 ~ file: PostList.jsx:11 ~ PostList ~ posts", posts);
  // const abc = posts.
  // console.log(abc);

  useEffect(() => {
    console.log("postList");
    dispatch(__getPosts());
  }, [dispatch]);

  return (
    <StPostList>
      {posts?.map((item) => {
        return <PostCard key={item.postId} posts={item} />;
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
