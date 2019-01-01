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

function getDayMarkup(day){
    const currentDate = new Date();
    let renderDay = " ";
    if(day !== null){
        renderDay = day.getDate();
        if(renderDay < currentDate.getDate())
            return(<div className="pastDay">{renderDay}</div>);
        else if(renderDay === currentDate.getDate())
            return(<div className="currentDay">{renderDay}</div>);
        else{
            if(day.getDay() === 0)
                return(<div className="redDay">{renderDay}</div>)
            else if(day.getDay() === 6)
                return(<div className="blueDay">{renderDay}</div>)
            else 
                return(<div className="blackDay">{renderDay}</div>)
        }
    }else{
        return(<div className="blackDay">{renderDay}</div>)
    }
}

class DaysContainer extends Component{

    render(){
        const currentDate = new Date();
        const thisYear = currentDate.getFullYear();
        const thisMonth = currentDate.getMonth();

        const monthArray = getDaysOfMonth(thisYear, thisMonth);
        const daysOfMonthMarkup = monthArray.map(week => <div className="week">{week.map(getDayMarkup)}</div>);           
        return(
            <div>{daysOfMonthMarkup}</div>
        );
    }
}

export default DaysContainer;