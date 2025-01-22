

const MonthSelector = ({monthSetHandler}) => {

    const months = Array.from({length:12},(_,idx:number)=>{
        return idx+1
    })

    return <table className={"absolute left-0 top-0 w-full h-full  bg-white border-collapse"}>
        {
            months.map((_, index: number) => {
                // 7개씩 묶어서 <tr> 태그로 감싸기
                if (index % 3 === 0) {
                    return (
                        <tr key={`month-row-${index / 3}`}>
                            {months.slice(index, index + 3).map((month:number) => (
                                <td onClick={monthSetHandler(month)} className={`border border-gray-300 text-center hover:bg-slate-100 hover:cursor-pointer`} key={`month-item-${month}`}>{month}월</td>
                            ))}
                        </tr>
                    );
                }
                return null; // 7개씩 그룹화된 tr만 반환
            })
        }
    </table>
}

export default MonthSelector;