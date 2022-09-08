import {useEffect, useState} from "react";

function LoadMore({setNewPage}){
    return(
        <>
            <button onClick={() => setNewPage(p => p + 1)} className="loadMoreData">Load More</button>
        </>
    )
}

export default function Pagination() {
    const [data, setData] = useState();
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
            .then(response => response.json())
            .then(r => (data ? setData(p => ({...p, 'data': p.data.concat(r.data)})) : setData(r)))
            .catch(err => console.error(err));
    }, [page])


    if(!data){
        return <h2>Loading...</h2>
    }

    const setNewPage = (newPage) => {
        setPage(newPage)
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
            <LoadMore setNewPage={setNewPage}/>
        </section>
    )
}