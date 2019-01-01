import React ,{Component} from "react";
import "./DayNamesContainer.css";

const dayNames = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토"
];

class DayNamesContiner extends Component{
    render(){
        const dayNamesMarkup = dayNames.map(dayName => <div className="DayName">{dayName}</div>)
        //const dayNamesMarkup = dayNames.map(dayName => <DayName dayName={dayName}></DayName>)
        return(    
            <div className="dayNamesMarkup">{dayNamesMarkup}</div>
        );
    }
}

export default DayNamesContiner;