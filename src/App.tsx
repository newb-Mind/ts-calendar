import CalendarContentsItem from "./components/CalendarContentsItem.tsx";
import CalendarHeadersItem from "./components/CalendarHeadersItem.tsx";



function App() {

    const daysInMonth = Array.from({ length: 42 }, (_, index) => index + 1);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



    const renderCalendar = () => {
        return daysInMonth.map((_:number, index:number) => {
            // 7개씩 묶어서 <tr> 태그로 감싸기
            if (index % 7 === 0) {
                return (
                    <tr key={index}>
                        {daysInMonth.slice(index, index + 7).map((day:number, idx:number) => (
                            <CalendarContentsItem key={`day-${index + idx}`}>{day}</CalendarContentsItem>
                        ))}
                    </tr>
                );
            }
            return null; // 7개씩 그룹화된 tr만 반환
        });
    };
  return (
    <>
        <table>
            <thead>
                {daysOfWeek.map((strOfWeek,idx)=><CalendarHeadersItem key={`header-${idx}`}>{strOfWeek}</CalendarHeadersItem>)}
            </thead>
            <tbody>
                {renderCalendar()}
            </tbody>
        </table>


    </>
  )
}

export default App
