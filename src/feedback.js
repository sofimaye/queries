import {useEffect, useRef, useState} from "react";

export default function Feedback() {
    const [response, setResponse] = useState();
    const [feedback, setFeedback] = useState();
    const [error, setError] = useState();
    const inputFeedback = useRef('');

    useEffect(() => {
        if (feedback) {
            const fetchData = async () => {
                const data = await fetch("https://wizard-world-api.herokuapp.com/Feedback", {
                    method: "POST",
                    body: JSON.stringify({
                        feedback: feedback
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                const json = await data.json();
                setResponse(json)
                inputFeedback.current.value = '';
            }
            fetchData().catch(setError)
        }
    }, [feedback]);

    const sendFeedBack = () => {
        setFeedback(inputFeedback.current.value);
    }

    return (
        <>
            <input type="text" ref={inputFeedback}/>
            <button onClick={sendFeedBack}>submit</button>
            {error ? console.log(error.message) :
                <h1>{response ? `The response is ${JSON.stringify(response)}` : "write a feedback"}</h1>}
        </>
    )
}