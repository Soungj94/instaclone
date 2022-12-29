import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { __postComment } from "../../redux/modules/commentSlice";

const CommentInput = () => {
  const dispatch = useDispatch();
  const [inputC, setInputC] = useState({ comment: "" });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputC({ ...inputC, [name]: value });
  };
  useEffect(() => {}, [dispatch]);

  const onClickInputHandler = () => {
    dispatch(__postComment({ comment: inputC.comment }));
    console.log(
      "🚀 ~ file: Home.jsx:26 ~ onClickInputHandler ~ { comment: inputC.comment}",
      { comment: inputC.comment, id: 1 }
    );
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
