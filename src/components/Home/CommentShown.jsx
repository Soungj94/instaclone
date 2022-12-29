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
    const payload = {
      postId: el.postId,
      commentId: el.commentId,
    };
    dispatch(__deleteComment(payload));
  };
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const EditClickHandler = (id) => {
    const payload = {
      postId: el.postId,
      commentId: el.commentId,
      comment: inputChange,
    };

    dispatch(__patchComment(payload)).then((res) => {});
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
        <ButtonChanger
          type="button"
          onClick={isEditing ? toggleEditing : () => delClickHandler(el)}
        >
          {isEditing ? "취소하기" : "삭제하기"}
        </ButtonChanger>
        <ButtonChanger
          type="button"
          onClick={
            isEditing
              ? () => EditClickHandler({ inputChange, id: el })
              : toggleEditing
          }
        >
          {isEditing ? "완료하기" : "수정하기"}
        </ButtonChanger>
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
const ButtonChanger = styled.button`
  background-color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: #0095f6;
`;
export default CommentShown;
