const YearSelector =  ({
                           startYear = 1900,
                           endYear = 2100,
                           yearSetHandler,
                       }: {
    startYear?: number;
    endYear?: number;
    yearSetHandler: any;
}) => {

    const years = Array.from({length:endYear-startYear},(_,idx:number)=>startYear+idx)

    return <table className={"absolute left-0 top-0 w-full h-full  bg-white border-collapse overflow-auto"}>
        {
            years.map((_, index: number) => {
                // 3개씩 묶어서 <tr> 태그로 감싸기
                if (index % 3 === 0) {
                    return (
                        <tr key={`year-row-${index / 3}`} >
                            {years.slice(index, index + 3).map((year:number) => (
                                <td onClick={yearSetHandler(year)} className={`border border-gray-300 text-center hover:bg-slate-100 hover:cursor-pointer  
                                h-20`} key={`year-item-${year}`}>{year}년</td>
                            ))}
                        </tr>
                    );
                }
                return null; // 3개씩 그룹화된 tr만 반환
            })
        }
    </table>
}

export default YearSelector;