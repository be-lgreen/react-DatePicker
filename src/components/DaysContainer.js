import React, {Component} from "react";
import "./DaysContainer.css"
import Day from "./Day"
import "./Day.css"
import { strict } from "assert";

function getDaysOfMonth(thisYear, thisMonth){
    let currentDate = new Date(thisYear, thisMonth);
    let monthArray = [[]];
    let tempWeekArray = [];

    for(let i=0; i<currentDate.getDay(); i++){
        tempWeekArray.push(null);
    }

    while(currentDate.getMonth() === thisMonth){
        if(tempWeekArray.length === 7){
            monthArray.push(tempWeekArray);
            tempWeekArray = [];
        }
        tempWeekArray.push(currentDate);
        currentDate = new Date(thisYear, thisMonth, currentDate.getDate()+1);
    }

    while(tempWeekArray.length <= 6){
        tempWeekArray.push(null);
    }

    monthArray.push(tempWeekArray);
    
    return monthArray;
}

function isDateSelected(renderDate, selectedDateList){
    for(let i=0; i<selectedDateList.length; i++){
        if(renderDate === selectedDateList[i].getDate())
            return i;
    }
    return -1;
}

function isDateSelectedMid(renderDate, selectedDateList){
    if(renderDate > selectedDateList[0].getDate() && renderDate < selectedDateList[1].getDate()){
        return true;
    }
    return false;
}

class DaysContainer extends Component{
    constructor(props){
        super(props);
        this.getDayMarkup = this.getDayMarkup.bind(this);
    }

    render(){
        const{ selectedDate } = this.props;

        const thisYear = selectedDate.getFullYear();
        const thisMonth = selectedDate.getMonth();

        const monthArray = getDaysOfMonth(thisYear, thisMonth);
        const daysOfMonthMarkup = monthArray.map(week => <div className="week">{week.map(this.getDayMarkup)}</div>);           
        return(
            <div>{daysOfMonthMarkup}</div>
        );
    }

    getDayMarkup(day){
        const { selectedDateList, handleDayClicks, inputTextArray} = this.props;
        
        
        if(day !== null){
            const currentDate = new Date().getDate();
            const renderDate = day.getDate();
            const dateSelected = isDateSelected(renderDate, selectedDateList);
            let dateSelectedMid = false;
    
            const selectedDateListLen = selectedDateList.length;
            let inputText = inputTextArray[day.getDate()];
            if(dateSelected === -1){
                if(selectedDateList.length === 2){
                    dateSelectedMid = isDateSelectedMid(renderDate, selectedDateList);
                }
            }else{
                inputText = "선택" + String(dateSelected+1);
            }
            
            let color = "";
            let disable = "";
            if(renderDate < currentDate){
                color = "Gray";
                disable = true;
            }else if(renderDate === currentDate){
                color = "Green";
                disable = true;
            }else{
                if(day.getDay() === 0){
                    color = "Red"
                    disable = false;
                }
                else if(day.getDay() === 6){
                    color = "Blue";
                    disable = false;
                }else {
                    color = "Black"
                    disable = false;
                }   
            }

            return(<div className="Day">
            <Day 
            day={day} 
            color={color} 
            selected={dateSelected} 
            selectedMid={dateSelectedMid}
            selectedDateListLen={selectedDateListLen}
            handleDayClicks={handleDayClicks}
            inputText={inputText}
            disable={disable}
            /></div>)

        }else{
            return(<div className="Day"><Day day={null}/></div>)
        }

    }  
}

export default DaysContainer;