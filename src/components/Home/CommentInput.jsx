import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { __postComment } from "../../redux/modules/mainSlice";
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
    </>
  );
};

export default CommentInput;
