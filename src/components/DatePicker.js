import React ,{Component} from "react";
import "./DatePicker.css";
import DayNamesContainer from "./DayNamesContainer";
import DaysContainer from "./DaysContainer";
import Popup from './Popup';

class DatePicker extends Component{
    constructor(props){
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.clickCount = 0;
        this.singleClickTimer = '';
    }
    state = {
        selectedDate: new Date(),
        selectedDateList: [],

        showPopup : false,
        inputTextArray : ['', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '']
    }

    shouldComponentUpdate(nextProps, nextState){
        if((this.state.inputTextArray !== nextState.inputTextArray) ||
         (this.state.selectedDateList !== nextState.selectedDateList) ||
         (this.state.showPopup !== nextState.showPopup))
            return true;
        else
            return false;
    }

    render(){
        const{ selectedDate, selectedDateList, showPopup, inputTextArray} = this.state;
        const{
            handleDayClicks,

            handlePopupCloseClick,
            handleButtonText,         
        } = this;
 
        return(    
            <div className="DatePickerTemplate">
                <div className="DatePickerTitle">{selectedDate.getFullYear() + "." + (selectedDate.getMonth()+1) + "."}</div>
                <div className="DatePickerDayNamesContainer">
                    <DayNamesContainer/>
                </div>
                <div className="DatePickerDaysContainer">
                    <DaysContainer 
                    selectedDate={selectedDate}
                    selectedDateList={selectedDateList}
                    handleDayClicks={handleDayClicks}
                    inputTextArray={inputTextArray}
                    />
                </div>
                {showPopup ? <Popup handleButtonText={handleButtonText} handlePopupCloseClick={handlePopupCloseClick}/> : null}
            </div>  
        );
    }

    handleDayClick(newDay){
        const { selectedDate, selectedDateList} = this.state;
        this.setState({
            selectedDate: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                newDay.getDate()
            )
        })
        
        if((selectedDateList.length === 0) || (newDay.getDate() > selectedDateList[selectedDateList.length-1].getDate())){
            this.setState({
                selectedDateList: selectedDateList.concat(
                    new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        newDay.getDate()
                    )
                )
            })
        }else{
            for(let i=0; i<selectedDateList.length; i++){
                //if(newDay.getDate() === selectedDateList[i].getDate()){
                    this.setState({
                        selectedDateList: selectedDateList.filter(date => date.getDate() !== newDay.getDate())
                    })
                //}
            }
        }

    }

    handleDayDoubleClick = (newDay) => {
        console.log("handleDaydoubleClick: ", newDay);

        const{ showPopup, selectedDate} = this.state;
        this.setState({
            selectedDate: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                newDay.getDate()
            ),
            showPopup: !showPopup
        })
    }

    handleDayClicks = (newDay) => {
        const{handleDayClick, handleDayDoubleClick} = this;

        this.clickCount++;
        if(this.clickCount === 1){
            this.singleClickTimer = setTimeout(function(){
                this.clickCount = 0;
                handleDayClick(newDay);
            }.bind(this), 300);
        }else if(this.clickCount === 2){
            clearTimeout(this.singleClickTimer);
            this.clickCount = 0;
            handleDayDoubleClick(newDay);
        }
    }

    handlePopupCloseClick = () => {
        const{showPopup} = this.state;

        this.setState({
            showPopup : !showPopup
        })
    }

    handleButtonText = (inputText) => {
        const{inputTextArray, selectedDate} = this.state;
        this.setState({
            inputTextArray : inputTextArray.map(
                (info, index) => {
                    if(index === selectedDate.getDate()){
                        return inputText;
                    }else{
                        return info;
                    }
                }
            )
        })
    }
}

export default DatePicker;