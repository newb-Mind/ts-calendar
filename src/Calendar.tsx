import CalendarContentsItem from "./components/CalendarContentsItem.tsx";
import CalendarHeadersItem from "./components/CalendarHeadersItem.tsx";
import React from "react";
import {CalendarDateType} from "./type/DataType.ts";
import MonthSelector from "./components/selector/MonthSelector.tsx";
import {CalendarShowType} from "./type/DataType.ts";
import YearSelector from "./components/selector/YearSelector.tsx";


type CalendarIndoType = {
    type : CalendarDateType,
    date : number
}

function Calendar({now = new Date()}) {

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const [showType,setShowType] = React.useState<CalendarShowType>(CalendarShowType.DATE);

    const [year,setYear] = React.useState<number>(99999);
    const [month,setMonth] = React.useState<number>(now.getMonth() + 1);

    const startDate = new Date(year,month-1,1);
    const lastDate = new Date(year,month,0);
    const prevLastDate = new Date(year, month - 1, 0); // 이전 달의 마지막 날

    const startDay = startDate.getDay(); // 시작 요일
    const totalDays = lastDate.getDate(); // 해당 월의 총 날짜 수

    const showHandler = ()=>{
        if(showType === CalendarShowType.DATE){
            setShowType(CalendarShowType.MONTH);
        }else if(showType === CalendarShowType.MONTH){
            setShowType(CalendarShowType.YEAR);
        }
    }
    const monthSetHandler= (num:number)=>()=>{
        setMonth(num);
        if(setShowType)
        setShowType(CalendarShowType.DATE);
    }

    const yearSetHandler= (num:number)=>()=>{
        setYear(num);
        if(setShowType)
            setShowType(CalendarShowType.MONTH);
    }
    const monthHandler = (num:number)=>()=>{
        const changedDate = new Date(year,month-1+num,1);
        setMonth(changedDate.getMonth()+1);
        setYear(changedDate.getFullYear());
    }

    // 앞달, 이번달, 뒷달 날짜 배열 생성
    const prevDays:CalendarIndoType[] = Array.from(
        { length: startDay },
        (_, idx) => ({type: CalendarDateType.PREV, date : prevLastDate.getDate() - startDay + idx + 1})
    );

    const currentDays:CalendarIndoType[] = Array.from({ length: totalDays }, (_, idx) => ({type: CalendarDateType.CURRENT, date :idx + 1}));

    const nextDays:CalendarIndoType[] = Array.from(
        { length: 42 - (prevDays.length + currentDays.length) },
        (_, idx) =>   ({type: CalendarDateType.NEXT, date :idx + 1})
    );

    // 전체 날짜 배열 합치기
    const daysInMonth:CalendarIndoType[] = [...prevDays, ...currentDays, ...nextDays];

  return (
    <>
            <div className={`flex justify-between`}>
                <button onClick={monthHandler(-1)}>Prev</button>
                <div className={`hover:bg-slate-100 hover:cursor-pointer flex-1 text-center`} onClick={showHandler} >
                    {
                        showType !== CalendarShowType.YEAR &&`${year}`
                    }
                    {
                         showType === CalendarShowType.DATE &&`.${String(month).padStart(2, "0")}`
                    }
                </div>
                <button onClick={monthHandler(1)}>Next</button>
            </div>
        <div className={"relative inline-block overflow-auto"}>

            <table>
                <thead>
                {daysOfWeek.map((strOfWeek, idx) => <CalendarHeadersItem
                    key={`header-${idx}`}>{strOfWeek}</CalendarHeadersItem>)}
                </thead>
                <tbody>
                {
                    daysInMonth.map((_: CalendarIndoType, index: number) => {
                        // 7개씩 묶어서 <tr> 태그로 감싸기
                        if (index % 7 === 0) {
                            return (
                                <tr key={`day-row-${index / 7}`}>
                                    {daysInMonth.slice(index, index + 7).map((data: CalendarIndoType, idx: number) => (
                                        <CalendarContentsItem key={`day-item${index + idx}`}
                                                              type={data.type}>{data.date}</CalendarContentsItem>
                                    ))}
                                </tr>
                            );
                        }
                        return null; // 7개씩 그룹화된 tr만 반환
                    })
                }
                </tbody>
            </table>
            {showType === CalendarShowType.MONTH && <MonthSelector monthSetHandler={monthSetHandler}/>}
            {showType === CalendarShowType.YEAR && <YearSelector yearSetHandler={yearSetHandler} />}
        </div>

    </>
  )
}

export default Calendar
