import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal } from "antd";

export interface EditFormHandle {
  open(): void;
  close(): void;
}
interface EditFormProps {
  onOk?: () => void;
}

const EditForm = forwardRef<EditFormHandle, EditFormProps>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  function ok() {
    props.onOk?.();
  }

  function cancel() {
    setIsVisible(false);
  }

  function open() {
    setIsVisible(true);
  }

  function close() {
    setIsVisible(false);
  }

  return (
    <Modal title="Basic Modal" visible={isVisible} onOk={ok} onCancel={cancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
});

export default EditForm;
