// pagination which split on many pages
import {useEffect, useState} from "react";
import {pagesToLoad} from "./paginationUtils";

// 1 ... 4 |5| 6 ... 10
function LoadPages({totalPages, setPage, page}) {
    let pages = pagesToLoad({page, totalPages});

    // show ... after number which < than next more than 1
    return (
        <ul className="page-nums">
            {pages.map((number, index) => (
                <>
                <li key={index} className={page === number ? "currentPage" : 'page'}
                    onClick={() => setPage(number)}>{number}</li>
                {(number - pages[index+1] !== -1 && number !== pages[pages.length - 1]) && <li key={index + '...'}>...</li>}
                </>
            ))
            }
        </ul>
    )

}

// function LoadAnotherPage({totalPages, setPage, page}) {
//     let arrayOfNums = [];
//     for (let number = 0; number < totalPages; number++) {
//         arrayOfNums.push(number)
//     }
//
//     if (arrayOfNums.length === 0) {
//         return <h2>Loading....</h2>
//     }
//
//     return (
//         <ul className="page-nums">
//             {
//                 arrayOfNums.map((number, index) => (
//                         <li key={index} onClick={() => setPage(number)}
//                             className={page === number ? 'currentPage' : 'page'}>{number}</li>
//                     )
//                 )
//             }
//         </ul>
//     )
// }

export default function Pagination2() {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
            .then(response => response.json())
            .then(setData)
            .catch(err => console.error(err));
    }, [page])


    if (!data) {
        return <h2>Loading...</h2>
    }

    return (
        <section className="container">
            <h1>{data.totalPassengers}</h1>
            <h1>{data.totalPages}</h1>
            {data.data.map((data, index) => (
                <div key={index}>
                    <h1>{data._id}</h1>
                    <h2>{data.name}</h2>
                    <h3>{data.trips}</h3>
                    <p>{JSON.stringify(data.airline)}</p>
                </div>
            ))}
            <LoadPages totalPages={data.totalPages} setPage={setPage} page={page}/>
        </section>
    )
}