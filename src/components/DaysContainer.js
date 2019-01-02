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
        const { selectedDate, selectedDate2, isStartDateSelected, handleDayClick} = this.props;
        
        
        if(day !== null){

            //if component uploaded for the first time, variable isStartDateSelected is false 
            let selected = false;
            if(isStartDateSelected === true){
                selected = (day.getDate() === selectedDate.getDate());
            }

            const currentDate = new Date(2019,0,12).getDate();
            const renderDate = day.getDate();

            if(renderDate < currentDate)
                return(<div className="Day"><Day day={day} color={"Gray"}/></div>)
            else if(renderDate === currentDate)
                return(<div className="Day"><Day day={day} color={"Green"} handleDayClick={handleDayClick} selected={renderDate===selectedDate.getDate()}/></div>);
            else{
                if(day.getDay() === 0)
                    return(<div className="Day"><Day day={day} color={"Red"} handleDayClick={handleDayClick} selected={renderDate===selectedDate.getDate()}/></div>)
                else if(day.getDay() === 6)
                    return(<div className="Day"><Day day={day} color={"Blue"} handleDayClick={handleDayClick} selected={renderDate===selectedDate.getDate()}/></div>)
                else 
                    return(<div className="Day"><Day day={day} color={"Black"} handleDayClick={handleDayClick} selected={renderDate===selectedDate.getDate()}/></div>)
            
            }
        }else{
            return(<div className="Day"><Day day={null}/></div>)
        }
        /*
        const currentDate = new Date();
        if(day !== null){     
            const renderDay = day.getDate(); 
            if(renderDay < currentDate.getDate())
                return(<div className="Day"><Day day={day} color={"Gray"} handleDayClick={handleDayClick} selected={renderDay===selectedDate.getDate()}/></div>);
            else if(renderDay === currentDate.getDate())
                return(<div className="Day"><Day day={day} color={"Green"} handleDayClick={handleDayClick} selected={renderDay===selectedDate.getDate()}/></div>);
            else{
                if(day.getDay() === 0)
                    return(<div className="Day"><Day day={day} color={"Red"} handleDayClick={handleDayClick} selected={renderDay===selectedDate.getDate()}/></div>)
                else if(day.getDay() === 6)
                    return(<div className="Day"><Day day={day} color={"Blue"} handleDayClick={handleDayClick} selected={renderDay===selectedDate.getDate()}/></div>)
                else 
                    return(<div className="Day"><Day day={day} color={"Black"} handleDayClick={handleDayClick} selected={renderDay===selectedDate.getDate()}/></div>)
            }
        }else{
            return(<div className="Day"><Day day={null}/></div>)
        }*/
    }  
}

export default DaysContainer;