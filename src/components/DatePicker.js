import React ,{Component} from "react";
import "./DatePicker.css";
import DayNamesContainer from "./DayNamesContainer";
import DaysContainer from "./DaysContainer";

class DatePicker extends Component{
    render(){
        const currentDate = new Date();
        return(    
            <div className="DatePickerTemplate">
                <div className="DatePickerTitle">{currentDate.getFullYear() + "." + (currentDate.getMonth()+1) + "."}</div>
                <div className="DatePickerDayNamesContainer">
                    <DayNamesContainer/>
                </div>
                <div className="DatePickerDaysContainer">
                    <DaysContainer/>
                </div>
            </div>  
        );
    }
}

export default DatePicker;