import React from "react";
import CommentInput from "./CommentInput";
import CommentShown from "./CommentShown";

const CommentMain = ({ posts }) => {
  return (
    <>
      {posts.comments.map((el, i) => {
        return (
          <CommentShown
            id={posts.id}
            key={`main-comment-${i}`}
            el={el}
          ></CommentShown>
        );
      })}
      <CommentInput id={posts.postId} />
    </>
  );
};

export default CommentMain;
