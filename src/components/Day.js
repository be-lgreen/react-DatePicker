import React, {Component} from "react";
import "./Day.css"

const Day = ({day, color, handleDayClick, selected, selectedMid}) => {
    if(day === null){
        return <div className="EmptyStateDay"></div>
    }

    if(color === "Gray"){
        return <button className="GrayStateDay" disabled="true">{day.getDate()}</button> 
    }else if(color === "Green"){
        return <button className="GreenStateDay" disabled="true">{day.getDate()}</button>
    }

    ////
    if(selectedMid){
        return <button className="MidStateDay">{day.getDate()}</button>
    }

    let className = "Day";
    className = className + (selected ? "Selected" : color);
    return(
            <button className={className} onClick={handleDayClick.bind(this,day)}>{day.getDate()}</button>     
    );
};

export default Day;