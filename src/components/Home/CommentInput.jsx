import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { __postComment } from "../../redux/modules/mainSlice";
import styled from "styled-components";
// import { useParams } from "react-router-dom";

const CommentInput = ({ id }) => {
  const dispatch = useDispatch();
  //   const { postId } = useParams();
  const [inputC, setInputC] = useState({ comment: "" });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputC({ ...inputC, [name]: value });
  };
  //   useEffect(() => {}, [inputC]);

  const onClickInputHandler = () => {
    const payload = { id, comment: inputC.comment };
    dispatch(__postComment(payload));
  };
  return (
    <>
      <div>
        <InputInsta
          type="text"
          name="comment"
          placeholder="댓글 달기..."
          onChange={inputChangeHandler}
        ></InputInsta>
        <ButtonInsta type="button" onClick={onClickInputHandler}>
          게시
        </ButtonInsta>
      </div>
    </>
  );
};
const InputInsta = styled.input`
  width: 90%;
  height: 30px;
  border: transparent;
  border-radius: 5px;
`;

const ButtonInsta = styled.button`
  background-color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: #0095f6;
`;

export default CommentInput;
