import React, { useState } from 'react'
import * as Yup from 'yup'

const initialFormValues = {
    name: '',
    size:'',
    pepperoni: false,
    tomatoes: false,
    sausage: false,
    olives: false,
    instructions: '',
}

export default function Pizza() { 
    const [pizzas, setPizzas] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)

    //test form validity
    const schema = Yup.object().shape({
        name: Yup.string()
                 .required("You have to select a pizza.")
                 .min(2, 'Pizza must be at least 2 characters long.'),
        size: Yup.string()
                 .required("You have to select a pizza Size."),
        pepperoni: Yup.boolean(),
        tomatoes: Yup.boolean(),
        sausage: Yup.boolean(),
        olives: Yup.boolean(),
        instructions: Yup.string(),
    });
    /*const [errors, setErrors] = useState({
        name: '',
        size:'',
        pepperoni: '',
        tomatoes: '',
        sausage: '',
        olives: '',
        instructions: '',
    });*/
    

    //onChange event, record pizza composition, add to formValues
    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const checkOrValue = type==='checkbox'? checked:value
        setFormValues({...formValues, [name]:checkOrValue})
    }

    //onClick event, create Pizza and add to pizzas state
    const onClick = evt => {
        evt.preventDefault()
        schema.isValid(formValues).then(valid => {
            if(valid === false){return;}
            const newPizza = {
                name: formValues.name,
                size: formValues.size,
                instructions: formValues.instructions.trim(),
                pepperoni: formValues.pepperoni,
                tomatoes: formValues.tomatoes,
                sausage: formValues.sausage,
                olives: formValues.olives,
            
            }
            setPizzas([newPizza, ...pizzas])
            setFormValues(initialFormValues);
        })
    }

    return (
        <div>
            <div>Build Your Own Pizza</div>
            <form >

            {/* FIRST PART, SIZE, PIZZA NAME */}

            <label>Pizza Name
                    <input
                        type='text'
                        name='name'
                        onChange={onChange}
                        value={formValues.name}
                    ></input>
                </label>
                <br />

                {/* SECOND PART, SIZE, DROPDOWN MENU */}

                <label>Choice of Size
                    <select name='size' value={formValues.size} onChange={onChange}>
                        <option value=''>Select</option>
                        <option value='Small'>Small, 8"</option>
                        <option value='Medium'>Medium, 12"</option>
                        <option value='Large'>Large, 14"</option>
                    </select>
                </label>

                {/* THIRD PART, TOPPINGS, CHECKBOXES */}

                <div>Add Toppings</div>
                <label>Pepperoni
                    <input
                        name="pepperoni"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.pepperoni}
                    ></input>
                </label>
                <label>Diced Tomatoes
                    <input
                        name="tomatoes"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.tomatoes}
                    ></input>
                </label>
                <label>Sausage
                    <input
                        name="sausage"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.sausage}
                    ></input>
                </label>
                <label>Black Olives
                    <input
                        name="olives"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.olives}
                    ></input>
                </label>
                <br />

                {/* FOURTH PART, INSTRUCTIONS, TEXT INPUT */}

                <label>Special Instructions
                    <input
                        type='text'
                        name='instructions'
                        onChange={onChange}
                        value={formValues.instructions}
                    ></input>
                </label>
                <br />
                <button onClick={onClick}>Submit</button>
            </form>
        </div>
    )
}