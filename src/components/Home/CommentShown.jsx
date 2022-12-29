import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { __patchComment, __deleteComment } from "../../redux/modules/mainSlice";
import styled from "styled-components";

const CommentShown = ({ el, id }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [inputChange, setInputChange] = useState("");

  const delClickHandler = (id) => {
    dispatch(__deleteComment(id));
    // if (typeof bb.payload !== Number) {
    //   alert("다른 계정의 댓글을 지울 수 없습니다");
    // }
  };
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const EditClickHandler = (id) => {
    dispatch(__patchComment(id));
  };
  return (
    <>
      <div>
        <p>
          {el.nickname}
          {el.comment}
        </p>
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
          onClick={isEditing ? toggleEditing : () => delClickHandler(el)}
        >
          {isEditing ? "취소하기" : "삭제하기"}
        </button>
        <button
          type="button"
          onClick={
            isEditing
              ? () => EditClickHandler({ inputChange, id: el })
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
