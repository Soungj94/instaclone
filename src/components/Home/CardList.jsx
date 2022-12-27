import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PostCard from "./PostCard";

// 내가 등록한 글들을 나열해주는 컴포넌트
const CardList = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(__getCards());
  // }, [dispatch]);

  return <div>CardList</div>;
};

export default CardList;
