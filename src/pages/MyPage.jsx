import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __tokenCheck,
  __getUserInfo,
  __getMyPost,
} from "../redux/modules/profileSlice";
import styled from "styled-components";
import Header from "../components/Home/Header";
import { useParams } from "react-router-dom";

const MyPage = () => {
  const dispatch = useDispatch();
  const res = useSelector((state) => state.profileSlice.user);
  console.log(res.data);
  // const name = res?.data.nickname;
  // const { nickname } = useParams();
  const myPosts = useSelector((state) => state.profileSlice.data);
  console.log(myPosts.posts);
  const mine = myPosts?.posts;

  useEffect(() => {
    dispatch(__getMyPost(res?.data.nickname));
    dispatch(__tokenCheck());
  }, [dispatch]);

  return (
    <PageLayout>
      <Header />
      <Stwrap>
        <img src="/img/profile1_img.png" />
        <div>
          <StNickname>
            <h2>{res?.data.nickname}</h2>
            <button>프로필편집</button>
          </StNickname>
          <ul>
            <li>
              게시물<span>99</span>
            </li>
            <li>
              팔로워<span>1.4k</span>
            </li>
            <li>
              팔로우<span>158</span>
            </li>
          </ul>
        </div>
        <Bottomline></Bottomline>
      </Stwrap>

      <ImgBoxWrap>
        {mine?.map((item) => {
          return (
            <div key={item.postId}>
              <StImg alt="내 게시글 미리보기" src={item.image} />
            </div>
          );
        })}
      </ImgBoxWrap>
    </PageLayout>
  );
};

const StImg = styled.img`
  width: 200px;
  height: 200px;
`;

const Stwrap = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  position: relative;
  justify-content: center;
  padding: 35px;

  img {
    width: 150px;
    height: 150px;
    margin-right: 100px;
  }
  ul {
    display: flex;
    list-style: none;
    gap: 16px;
  }
  li {
    margin-right: 40px;
    margin-left: -40px;
    span {
      font-weight: 600;
      padding-left: 8px;
    }
  }
`;

const StNickname = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  button {
    width: 100px;
    height: 32px;
    background-color: #efefef;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    :hover {
      background-color: #e0e0e0;
      cursor: pointer;
    }
  }
`;

const PageLayout = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  right: 0;
`;

const Bottomline = styled.div`
  border-top: 1px solid #efefef;
  width: 76%;
  margin-top: 180px;
  position: absolute;
`;
const ImgBoxWrap = styled.div`
  display: flex;
  width: 1200px;
  gap: 5px;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: center;
`;

export default MyPage;
