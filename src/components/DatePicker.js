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
        selectedDateList: []
    }

    render(){
        const{ selectedDate, selectedDateList } = this.state;
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
                    selectedDateList={selectedDateList}
                    handleDayClick={handleDayClick}/>
                </div>
            </div>  
        );
    }

    handleDayClick(newDay){
        const { selectedDate, selectedDateList} = this.state;
        //console.log("before length: ", selectedDateList.length);
        //for(let i=0; i<selectedDateList.length; i++){
        //    console.log("hi: ",selectedDateList[i].getDate());
        //}

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
}

export default DatePicker;