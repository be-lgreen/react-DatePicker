import React, {Component} from 'react';
import "./Popup.css";

class Popup extends Component{

    state = {
        inputText: ''
    }
    handleTextChange = (e) => {
        this.setState({
            inputText: e.target.value
        })
    }

    handleTextSubmit = (e) => {
        const{ handleButtonText, handlePopupCloseClick } = this.props;
        const{ inputText} = this.state;

        e.preventDefault(); 
        handleButtonText(inputText);
        this.setState({
            inputText : ''
        })
        handlePopupCloseClick();
    }

    render(){
        const{handlePopupCloseClick} = this.props;
        const{inputText} = this.state;
        const{handleTextChange, handleTextSubmit} = this;
        
        return(
            <div className='Popup'>
                <from className="PopupInner">
                    <input
                        placeholder="텍스트를 입력 하세요"
                        value = {inputText}
                        onChange={handleTextChange}
                    />
                    <div className="PopupButtons">
                        <button className="SubmitButton" onClick={handleTextSubmit}>등록</button>
                        <button className="CancelButton" onClick={handlePopupCloseClick}>취소</button>
                    </div>
                </from>
            </div>
        );
    }
}

export default Popup;