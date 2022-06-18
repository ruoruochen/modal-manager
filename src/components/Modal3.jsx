import React, { useEffect, useState } from "react";
import { modalLevel } from "../constants/modalLevel";

const Modal3 = (props) => {
  const { modalManager, defaultValue } = props;
  const [showModal, setShowModal] = useState(defaultValue);

  useEffect(() => {
    // 订阅
    modalManager.subscribe("modal3", modalLevel.modal3, (state) => {
      setShowModal(state);
    });
    modalManager.notify("modal3", true);
  }, []);

  // 状态变化时，发布消息
  useEffect(() => {
    modalManager.subscribe("modal3", showModal);
  }, [showModal]);

  if (!showModal) {
    return <></>;
  }

  // 点击后，隐藏当前弹窗
  const handleClick = () => {
    modalManager.notify("modal3", false);
  };

  return (
    <div
      style={{ background: "green", width: "375px", height: "1000px" }}
      onClick={handleClick}
    >
      Modal3
    </div>
  );
};

export default Modal3;
