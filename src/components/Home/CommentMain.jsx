import React from "react";

import CommentInput from "./CommentInput";
import CommentShown from "./CommentShown";

const CommentMain = ({ data }) => {
  return (
    <>
      <CommentInput id={data.postId} />
      {data.comments.map((el, i) => {
        return (
          <CommentShown
            id={data.id}
            key={`main-comment-${i}`}
            el={el}
          ></CommentShown>
        );
      })}

      {/* {data?.map((el, i) => {
        return (
          <CommentShown key={`main-comment-${i}`} postId el={el}>
            {item.comment}
          </CommentShown>
        );
      })} */}
      {/* {mainSlice.map((el) => {
        return el.postId === data.postId
          ? el.comments.map((item, i) => {
              console.log(item);
              return (
                <CommentShown key={`main-comment-${i}`} postId el={item}>
                  {item.comment}
                </CommentShown>
              );
            })
          : null;
      })} */}
    </>
  );
};

export default CommentMain;
