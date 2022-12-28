import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  __deleteComment,
  __patchComment,
} from "../../redux/modules/commentSlice";
import styled from "styled-components";

const CommentShown = (id, el) => {
  const dispatch = useDispatch();
  const { commentList } = useSelector((state) => state.commentPost);

  const [isEditing, setIsEditing] = useState(false);

  const [inputChange, setInputChange] = useState("");

  const delClickHandler = async (id) => {
    const bb = await dispatch(__deleteComment(id));
    if (typeof bb.payload !== Number) {
      alert("다른 계정의 댓글을 지울 수 없습니다");
    }
  };
  const toggleEditing = (a) => {
    setIsEditing((prev) => !prev);
  };
  const EditClickHandler = (ff) => {
    dispatch(__patchComment(ff));
  };
  return (
    <>
      <div>
        <p>{el.content}</p>
      </div>
      <div>
        {isEditing && (
          <>
            <UpdateCommentInput
              onChange={(e) => {
                setInputChange(e.target.value);
              }}
              value={inputChange}
              type="text"
              placeholder="댓글 수정란"
            />
          </>
        )}
        <button
          type="button"
          onClick={
            isEditing ? toggleEditing : () => delClickHandler(el.commentId)
          }
        >
          {isEditing ? "취소하기" : "삭제하기"}
        </button>
        <button
          type="button"
          onClick={
            isEditing
              ? () => EditClickHandler({ inputChange, id: el.commentId })
              : toggleEditing
          }
        >
          {isEditing ? "완료하기" : "수정하기"}
        </button>
      </div>
    </>
  );
};

const UpdateCommentInput = styled.input`
  width: 100%;
  height: 30px;
  border: transparent;
  border-radius: 5px;
`;
export default CommentShown;
