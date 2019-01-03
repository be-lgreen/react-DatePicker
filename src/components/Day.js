import React, {Component} from "react";
import "./Day.css"

const Day = ({day, color, handleDayClicks, selected, selectedMid, selectedDateListLen, inputText, disable}) => {
    //buttons which disalbed="true"
    if(day === null){
        return <div className="EmptyStateDay"></div>
    }

    let className = ""
    className = className + (selected >= 0 ? "Selected" : color);
    if(selectedDateListLen >= 3 && className === "Selected"){
        className = "Multi" + className;
    }
    if(selectedMid){
        className = "BetweenSelected";
    }
    if(color === "Gray")
        className = "Gray"
    else if(color === "Green")
        className = "Green"
        
    return(
            <button className={className} onClick={handleDayClicks.bind(this,day)} disabled={disable}>
                <div className="ButtonLayout">
                    <text className="ButtonDateText">{day.getDate()}</text>
                    <text className="ButtonText">{inputText}</text>
                </div>
           </button>   
    );
};

export default Day;