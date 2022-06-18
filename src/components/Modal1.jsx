import React, { useEffect, useState } from "react";
import { modalLevel } from "../constants/modalLevel";
const Modal1 = (props) => {
  const { modalManager, defaultValue } = props;
  const [showModal, setShowModal] = useState(defaultValue);
  useEffect(() => {
    // 初始化订阅
    modalManager.subscribe("modal1", modalLevel.modal1, (state) => {
      setShowModal(state);
    });
    // 初始化展示弹窗
    modalManager.notify("modal1", true);
  }, []);

  // 状态变化时，发布消息
  useEffect(() => {
    modalManager.subscribe("modal1", showModal);
  }, [showModal]);

  if (!showModal) {
    return <></>;
  }

  // 点击后，隐藏当前弹窗
  const handleClick = () => {
    modalManager.notify("modal1", false);
  };

  return (
    <div
      style={{ background: "red", width: "375px", height: "1000px" }}
      onClick={handleClick}
    >
      Modal1
    </div>
  );
};

export default Modal1;
