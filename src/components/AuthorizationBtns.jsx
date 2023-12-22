import React, { useState } from "react";
import styled from "styled-components";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const Container = styled.div`
  display: flex;
  overflow: hidden;
  width: 209px;
  height: 45px;
  border-radius: 30px;
  font-size: 18px;
  position: relative;
  background-color: #d9eee1;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 30px;
  background-color: ${(props) => (props.active ? "#04AA6D" : "#D9EEE1")};
  z-index: 10;
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.active === "signUp" ? "0" : "50%")};
  width: 50%;
  height: 100%;
  border-radius: 30px;
  background-color: #04aa6d;
  transition: left 0.3s;
  z-index: 1;
`;

const AuthorizationBtns = () => {
  const [activeButton, setActiveButton] = useState("signUp");
  const [authorizationModal, setAuthorizationModal] = useState();

  const handleClick = (button) => {
    setActiveButton(button);
    setAuthorizationModal(button);
  };

  return (
    <Container>
      <Button
        className="first"
        active={activeButton === "signUp"}
        onClick={() => handleClick("signUp")}
      >
        Sign Up
      </Button>
      <Button
        className="second"
        active={activeButton === "signIn"}
        onClick={() => handleClick("signIn")}
      >
        Log In
      </Button>
      <Slider active={activeButton} />
      {authorizationModal === "signIn" && (
        <SignInModal
          authorizationModal={authorizationModal}
          setAuthorizationModal={setAuthorizationModal}
        />
      )}
      {authorizationModal === "signUp" && (
        <SignUpModal
          authorizationModal={authorizationModal}
          setAuthorizationModal={setAuthorizationModal}
        />
      )}
    </Container>
  );
};

export default AuthorizationBtns;
