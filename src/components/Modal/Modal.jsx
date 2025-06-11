import { useEffect } from "react";
import "./Modal.scss";

export const Modal = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="ModalOverlay">
      <div className="YouSureModal">
        <div className="data-container">
          <h3 className="YouSureTextModal">Ви впевнені?</h3>
          <div className="YouSureButtons">
            <button className="btn-orange" onClick={onConfirm}>
              Так
            </button>
            <button className="btn-grey _no-btn" onClick={onCancel}>
              Ні
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalTwo = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="ModalOverlay">
      <div className="YouSureModal">
        <div className="data-container">
          <h3 className="YouSureTextModal">Ви дійсно хочете вийти?</h3>
          <div className="YouSureButtons">
            <button className="btn-orange" onClick={onConfirm}>
              Так
            </button>
            <button className="btn-grey _no-btn" onClick={onCancel}>
              Ні
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
