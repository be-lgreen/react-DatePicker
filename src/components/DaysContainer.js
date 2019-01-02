import React, {Component} from "react";
import "./DaysContainer.css"
import Day from "./Day"

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
    //return true or false
    for(let i=0; i<selectedDateList.length; i++){
        if(renderDate === selectedDateList[i].getDate())
            return true;
    }

    return false;
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
        const { selectedDateList, handleDayClick} = this.props;
        
        
        if(day !== null){
            const currentDate = new Date(2019,0,12).getDate();
            const renderDate = day.getDate();
            const dateSelected = isDateSelected(renderDate, selectedDateList);
            let dateSelectedMid = false;

            if(!dateSelected){
                if(selectedDateList.length == 2){
                    dateSelectedMid = isDateSelectedMid(renderDate, selectedDateList);
                }
            }
            
            

            if(renderDate < currentDate)
                return(<div className="Day"><Day day={day} color={"Gray"}/></div>)
            else if(renderDate === currentDate)
                return(<div className="Day"><Day day={day} color={"Green"}/></div>)
            else{
                if(day.getDay() === 0)
                    return(<div className="Day"><Day day={day} color={"Red"} handleDayClick={handleDayClick} selected={dateSelected} selectedMid={dateSelectedMid}/></div>)
                else if(day.getDay() === 6)
                    return(<div className="Day"><Day day={day} color={"Blue"} handleDayClick={handleDayClick} selected={dateSelected} selectedMid={dateSelectedMid}/></div>)
                else 
                    return(<div className="Day"><Day day={day} color={"Black"} handleDayClick={handleDayClick} selected={dateSelected} selectedMid={dateSelectedMid}/></div>)    
            }
        }else{
            return(<div className="Day"><Day day={null}/></div>)
        }
    }  
}

export default DaysContainer;