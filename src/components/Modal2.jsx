import React, { useEffect, useState } from "react";
import { modalLevel } from "../constants/modalLevel";

const Modal2 = (props) => {
  const { modalManager, defaultValue } = props;
  const [showModal, setShowModal] = useState(defaultValue);

  useEffect(() => {
    // 订阅
    modalManager.subscribe("modal2", modalLevel.modal2, (state) => {
      setShowModal(state);
    });
    modalManager.notify("modal2", true);
  }, []);

  // 状态变化时，发布消息
  useEffect(() => {
    modalManager.subscribe("modal2", showModal);
  }, [showModal]);

  if (!showModal) {
    return <></>;
  }

  // 点击后，隐藏当前弹窗
  const handleClick = () => {
    modalManager.notify("modal2", false);
  };
  return (
    <div
      style={{ background: "yellow", width: "375px", height: "1000px" }}
      onClick={handleClick}
    >
      Modal2
    </div>
  );
};

export default Modal2;
