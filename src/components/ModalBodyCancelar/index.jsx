import './style.css'

const ModalBodyCancelar = ({ children, onClose, onModalAction, btnConfirmVisible = 1 }) => {
    return <div className="modal-background">
        <div className="modal-area">
            <div className="modal-content">
                {children}
            </div>
            <div className="button-content">
                <button className="go-back" onClick={onClose}>Voltar</button>
                {btnConfirmVisible == 0 ? [] : (
                    <button
                        className="go-confirm"
                        onClick={onModalAction}
                    >
                        Confirmar
                    </button>
                )}
            </div>
        </div>
    </div>
}

export default ModalBodyCancelar