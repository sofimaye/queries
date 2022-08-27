// wizards -> elixirs -> ingredients
import {useEffect, useState} from "react";

function Ingredients({elixirId}) {
    const [elixir, setElixir] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`https://wizard-world-api.herokuapp.com/Elixirs/${elixirId}`)
            .then((res) => res.json())
            .then(setElixir, setError)
    }, [elixirId]);

    if (!elixir){
        return <h1>Loading elixir ingredients....</h1>
    }

    return (
        <>
            <h1>{elixir.name} ingredients</h1>
            {(elixir.ingredients.length === 0) ? <h3>There are no ingredients</h3> :
                elixir.ingredients?.map(({name}, index) => (
                <>
                    <h3>{index+1}</h3><h3>{name}</h3>
                </>
                )
            )}
            {error ? console.log("Error:", error.message) : console.log("There is an elixir: ", elixir)}
        </>
    )
}

function Wizard({id}) {
    const [wizard, setWizard] = useState();
    const [elixirId, setElixirId] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setElixirId(undefined);
        fetch(`https://wizard-world-api.herokuapp.com/Wizards/${id}`)
            .then((res) => res.json())
            .then(setWizard, setError)
    }, [id]);

    if (!wizard) {
        return <p>Loading</p>
    }
    return (
        <>
            <h1>{wizard.firstName}</h1> <h1>{wizard.lastName}</h1>
            <h2>Click on the elixir to see the ingredients</h2>
            <table id="table">
                <tbody>
                <tr>
                    <th>Elixirs</th>
                </tr>
                {wizard.elixirs.map((elixir, index) =>
                    <tr key={index} onClick={() => setElixirId(elixir.id)}>
                        <td>{index + 1}</td><td id="elixir-name">{elixir.name}</td>
                    </tr>
                )}
                </tbody>
            </table>

            {(elixirId) ? <Ingredients elixirId={elixirId}/> : console.log("There are no elixirId")}
            {error ? console.log("Error:", error.message) : console.log("There is an wizard: ", wizard)}
        </>
    )
}


export default function WizardSearch2() {
    const [wizards, setWizards] = useState();
    const [id, setId] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch("https://wizard-world-api.herokuapp.com/Wizards")
            .then(res => res.json())
            .then(setWizards, setError);
    }, []);

    console.log("wizards: ", wizards)
    return (
        <>
            <h1>Wizard's search</h1>
            <select id="wizards-search" onChange={({target}) => {
                setId(target.value)
            }}>
                <option hidden defaultValue>Choose the Wizard</option>
                {wizards?.map(({firstName, lastName, id}, index) =>
                    (<option key={index} value={id}>
                        {firstName}{lastName}
                    </option>)
                )}
            </select>
            {error ? console.log("Error:", error.message) : console.log("list of wizards", wizards)}
            {id ? <Wizard id={id}/> : console.log('there are no id')}
        </>
    )
}