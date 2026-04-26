import SlidingPane from "react-sliding-pane";


function Slider({ show, onClose, component,title }) {
    return (
            <SlidingPane isOpen={show} onRequestClose={onClose} 
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            title={title}>
                {component}
            </SlidingPane>
    )
}

export default Slider;