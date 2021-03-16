import React, { useState,useEffect } from 'react';
import { Card, duration } from '@material-ui/core';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import moment from 'moment';
import { Iso, Schedule } from '@material-ui/icons';
import { data } from '../Schedule';
import { getDefaultNormalizer } from '@testing-library/dom';
import ListArray from './ListArray'


const FindFreeSlots=()=>{

const [selectedDateTime, setSelectedDateTime] = useState('10.30 AM');
const [freeSlotList,setFreeSlotList]=useState([]); 
const [dateDuration, setDateDuration] = useState('30 min');
const [timeList,setTimeList]=useState([])
console.log(data)
const dateDiffList = getDateDiff(data);
  
console.log(dateDiffList)
  const fSlotList = getFreeTimeSlots(dateDiffList)

function getDateDiff (startDate, endDate){
    const  sDate = moment(startDate);
    const eDate = moment(endDate);
    const diff = eDate.diff(sDate,'minutes')
  return diff
}

function getFreeTimeSlots(list){
    let i;
   const freeSlotList = [];
    for(i=0;i<list.length; i++){
      const timeStamp = new Date(list[i].endDate).getTime()
      const timeInMinut= timeStamp/(60*1000)
      const eDate = timeInMinut+Math.abs(list[i].minDiff)
      
     const startDate = list[i].endDate;
    
      const obj = {
        startDate : moment(startDate).format("MMM-DD-YYYY HH:mm:ss"),
        endDate : moment(eDate*60*1000).format("MMM-DD-YYYY HH:mm:ss")
      }
   
      freeSlotList.push(obj)
 
    }
    return freeSlotList;
   }


function onSelectChange(e){
    console.log({e});
       const getTime =moment(e.target.value).format("HH:mm: a")
       const l = timeList;
       l.push(getTime)
      setTimeList(l)
    
    setSelectedDateTime(getTime);
    setDateDuration(e.target.value)
   };


const sendDataToParent = (dataList) => { 
    console.log(dataList);
    getDateDiff(dataList)
};   
return(

<div className="main_div">
<form>
<div className="form_div"> 
   <h3>Find A Free Time</h3>
  
    <span id="Date"> 
    <label>Date : </label>
    {console.log(fSlotList)}
    <select
      onChange={onSelectChange}>
      {data.map((d, index) => (
        <option key={index} >{d.start}</option>
      ))}
    </select>
    {/* {data.map((d) => (<ListArray data={d} sendDataToParent={sendDataToParent}></ListArray>))} */}
   
    </span>

   <span id="Time">
     <label>Time : {selectedDateTime} </label>
   </span>
   <span id="Duration">
   <label>Duration : {dateDuration}</label>
   </span>
  <div className="showTime">
    <span id="date1" style={{padding:"10px", backgroundColor:"grey"}}><label>10:30 pm</label></span>
     <span id="date2"style={{backgroundColor:"green",padding:"10px"}}  > <label>09:30 am</label></span>
     
     {timeList.map((d, index) => (
      <span id="date1" style={{padding:"10px", backgroundColor:index % 2==0?"inherit":"green"}}><label>{d}</label></span>
      ))}
      <span id="date3" style={{padding:"10px", backgroundColor:"grey"}}> <label>10:30 am</label></span> 
</div>

   <div className="click">
   <button type="button" id="free">Free</button>
    <button type="button" id="busy">Busy</button>
    <button type="button" id="button3">Free</button>
   </div>
</div>
  

   <span></span>
   <span></span>
   <span></span>
</form>
</div> 
)}
  
export default FindFreeSlots;