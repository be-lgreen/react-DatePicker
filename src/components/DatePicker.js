import React ,{Component} from "react";
import "./DatePicker.css";
import DayNamesContainer from "./DayNamesContainer";
import DaysContainer from "./DaysContainer";

class DatePicker extends Component{
    constructor(props){
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
    }
    state = {
        selectedDate: new Date(),
        selectedDate2: null,
        isStartDateSelected: false
    }

    render(){
        const{ selectedDate, selectedDate2, isStartDateSelected } = this.state;
        const{
            handleDayClick
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
                    selectedDate2={selectedDate2} 
                    isStartDateSelected={isStartDateSelected}
                    handleDayClick={handleDayClick}/>
                </div>
            </div>  
        );
    }

    handleDayClick(newDay){
        const {selectedDate, isStartDateSelected} = this.state;
        console.log("isStartDateSelected : ", isStartDateSelected);
        if(isStartDateSelected === false){          
            this.setState({
                selectedDate: new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    newDay.getDate()
                ),
                selectedDate2: null,
                isStartDateSelected: true
            })
        }else if(isStartDateSelected === true){
            this.setState({
                selectedDate2: new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    newDay.getDate()
                ),
                isStartDateSelected: false
            })
        }
    }
}

export default DatePicker;