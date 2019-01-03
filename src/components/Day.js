import React, {Component} from "react";
import "./Day.css"

const Day = ({day, color, handleDayClicks, selected, selectedMid, selectedDateListLen, inputTextArray}) => {
    //buttons which disalbed="true"
    if(day === null){
        return <div className="EmptyStateDay"></div>
    }

    if(color === "Gray"){
        return <button className="Gray" disabled="true">{day.getDate()}</button> 
    }else if(color === "Green"){
        return <button className="Green" disabled="true">{day.getDate()}</button>
    }

    
    let className = ""
    className = className + (selected ? "Selected" : color);
    if(selectedDateListLen >= 3 && className === "Selected"){
        className = "Multi" + className;
    }
    if(selectedMid){
        className = "BetweenSelected";
    }
    return(
            <button className={className} onClick={handleDayClicks.bind(this,day)}>
                <div className="ButtonLayout">
                    <text>{day.getDate()}</text>
                    <text className="ButtonText">{inputTextArray[day.getDate()]}</text>
                </div>
           </button>   
    );
};

export default Day;