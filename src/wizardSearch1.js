import {useCallback, useEffect, useState, memo} from "react";

function WizardsSearch({error, item}) {
    return (
        <section id="chosen option">
            {item?.map(({name, effect, sideEffects, firstName, lastName}, index) =>
                <div>
                    <h2>{index + 1}</h2>
                    <h1>{firstName}</h1>
                    <h1>{lastName}</h1>
                    <h2>{name}</h2>
                    <p>{effect}</p>
                    <p>{sideEffects}</p>
                </div>)}
            {error ? console.log("Error:", error.message) : console.log("There is an item: ", item)}
        </section>
    )
}

const MemoizedWizardsSearch = memo(WizardsSearch)

export default function WizardSearch1() {
    const [option, setOption] = useState();
    const [item, setItem] = useState();
    const [error, setError] = useState();

    const choose = useCallback(({target}) => {
        setOption(target.value)
    }, []);

    const queryingItem = () => {
        fetch(`https://wizard-world-api.herokuapp.com/${option}`)
            .then(res => res.json())
            .then(setItem, setError);
    }

    useEffect(() => {
        if (option) {
            queryingItem();
        }
    }, [option]);

    return (
        <>
            <h1>Wizard's search</h1>
            <select id="wizards-search" onChange={choose}>
                <option defaultValue>Choose the option</option>
                <option>Elixirs</option>
                <option>Spells</option>
                <option>Wizards</option>
                <option>Ingredients</option>
            </select>
            <MemoizedWizardsSearch item={item} error={error}/>
        </>
    )
}