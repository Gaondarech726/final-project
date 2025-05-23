import "./Modal.scss";
export const Modal = () => {
  return (
    <div className="YouSureModal">
      <h3 className="YouSureTextModal">Ви впевнені?</h3>
      <div className="YouSureButtons">
        <button className="YouSureYesModal">Так</button>
        <button className="YouSureNoModal">Ні</button>
      </div>
    </div>
  );
  
};

export const ModalTwo = () => {
  return (
    <div className="YouSureModal">
      <h3 className="YouSureTextModal">Ви дійсно хочете вийти?</h3>
      <div className="YouSureButtons">
        <button className="YouSureYesModal">Так</button>
        <button className="YouSureNoModal">Ні</button>
      </div>
    </div>
  );
};
