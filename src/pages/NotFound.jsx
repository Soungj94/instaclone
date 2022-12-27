import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <StContainer>
      <StDialog>NOT FOUND : 잘못된 페이지 입니다</StDialog>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 99.6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDialog = styled.div`
  border-radius: 10px;
  padding: 12px 24px 24px 24px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 130px auto 0px auto;
  color: red;
  font-size: 35px;
  font-weight: 900;
`;
export default NotFound;
