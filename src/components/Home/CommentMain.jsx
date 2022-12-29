import React from "react";
import CommentInput from "./CommentInput";
import CommentShown from "./CommentShown";

const CommentMain = ({ posts }) => {
  return (
    <>
      <CommentInput id={posts.postId} />
      {posts.comments.map((el, i) => {
        return (
          <CommentShown
            id={posts.id}
            key={`main-comment-${i}`}
            el={el}
          ></CommentShown>
        );
      })}
    </>
  );
};

export default CommentMain;
