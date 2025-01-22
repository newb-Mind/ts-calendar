import * as React from "react";
import {CalendarDateType} from "../type/DataType.ts";

interface CalendarItemProps {
    children: React.ReactElement | number,
    type:CalendarDateType
}

const CalendarContentsItem:React.FC<CalendarItemProps>= ({children,type}) => {
    return <td className={`px-2 py-1 border shadow-2xl w-10 h-10 hover:cursor-pointer hover:bg-slate-100`}>
        <span className={`content-center text-center w-full h-full inline-block ${type!==CalendarDateType.CURRENT && 'text-gray-500'}`}>
            {children}
        </span>
    </td>
}

export default CalendarContentsItem;