import "./Modal.scss"
const Modal = () => {
    return(
        <div className="YouSureModal">
        <h3 className="YouSureTextModal">Ви впевнені?</h3>
        <button className="YouSureYesModal">Так</button>
        <button className="YouSureNoModal">Ні</button>
        </div>
        
    )
};

export default Modal;
