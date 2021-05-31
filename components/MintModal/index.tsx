import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import MemeCreationForm from "./MemeCreationForm";

const FormWrapper = styled.div`
  max-height: calc(100vh - 116px);
`;

const ModalWrapper = styled.div`
  max-height: calc(100vh - 60px);
`;

export default function MintModal(props: {
  visible: boolean;
  role: string;
  closeMintModal: () => void;
}) {
  return (
    <div
      className={
        !props.visible
          ? "hidden"
          : "fixed origin-top-left top-0 left-0 z-20 h-screen w-full max-h-full pt-6 pb-6 pl-2 pr-2 max-h-screen"
      }
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-mainbg rounded-xl w-full max-h-full max-w-max shadow-2xl">
          <ModalWrapper className="text-title text-secondary text-lg max-h-full font-semibold justify-around max-w-max">
            <div className="w-full flex justify-between">
              <div className="px-10 flex justify-around items-center">
                Create Meme NFT Token
              </div>
              <div
                className="w-14 h-14 flex justify-around cursor-pointer items-center hover:bg-asidebg hover:text-white"
                onClick={props.closeMintModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            {/* <div className="max-w-max pb-3">Choose your login method:</div> */}
            <FormWrapper className="flex justify-center space-x-5 py-10 bg-asidebg max-w-7xl p-8 overflow-auto">
              <MemeCreationForm role={props.role} />
            </FormWrapper>
          </ModalWrapper>
        </div>
      </div>
    </div>
  );
}
