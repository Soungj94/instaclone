import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div name="디테일페이지 wrap">
      <img src="" alt="디테일페이지 이미지 들어갈 자리" />
      <div name="디테일페이지 정보 보여줄 div">
        <div>수정, 삭제 버튼 들어갈 곳</div>
        <div name="아이디 컨텐트 wrap">
          <div>아이디 들어갈 곳</div>
          <div>콘텐트 들어갈 곳</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
