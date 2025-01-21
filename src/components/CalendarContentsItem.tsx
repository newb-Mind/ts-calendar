import * as React from "react";


interface CalendarItemProps {
    children: React.ReactElement | number;
}

const CalendarContentsItem:React.FC<CalendarItemProps>= ({children}) => {

    return <td className={`px-2 py-1 border shadow-2xl w-10 h-10`}>
        <span className={"content-center text-center w-full h-full inline-block"}>
            {children}
        </span>
    </td>
}

export default CalendarContentsItem;