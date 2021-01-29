import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

    const history = useHistory();

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
            console.log(pizzas)
            history.push({
                pathname: '/confirmation',
                state: {detail: pizzas},
            })
        })
    }

    return (
        <div className='pizza'>
            <h2>Build Your Own Pizza</h2>
            <form className='form'>

            {/* FIRST PART, SIZE, PIZZA NAME */}

                <label><div className="choice-title">Name</div>
                    <input
                        type='text'
                        name='name'
                        onChange={onChange}
                        value={formValues.name}
                    ></input>
                </label>

                <label><div className="choice-title sauces">Choice of Sauce</div>
                    <input name='sauce' type='radio'/><span>Original Red</span>
                    <input name='sauce' type='radio'/><span>Garlic Ranch</span>
                    <input name='sauce' type='radio'/><span>BBQ Sauce</span>
                    <input name='sauce' type='radio'/><span>Spinach Alfredo</span>
                </label>

                {/* SECOND PART, SIZE, DROPDOWN MENU */}

                <label><div className="choice-title">Choice of Size</div>
                    <select name='size' value={formValues.size} onChange={onChange}>
                        <option value=''>Select</option>
                        <option value='Small'>Small, 8"</option>
                        <option value='Medium'>Medium, 12"</option>
                        <option value='Large'>Large, 14"</option>
                    </select>
                </label>

                {/* THIRD PART, TOPPINGS, CHECKBOXES */}

                <div className="choice-title">Add Toppings</div>
                <label>
                    <input
                        name="pepperoni"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.pepperoni}
                    ></input><span>Pepperoni</span>
                </label>
                <label>
                    <input
                        name="tomatoes"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.tomatoes}
                    ></input><span>Diced Tomatoes</span>
                </label>
                <label>
                    <input
                        name="sausage"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.sausage}
                    ></input><span>Sausage</span>
                </label>
                <label>
                    <input
                        name="olives"
                        type="checkbox"
                        onChange={onChange}
                        checked={formValues.olives}
                    ></input><span>Black Olives</span>
                </label>

                <label><div className="choice-title">Choice of Substitute</div>
                    <input name='gluten' type="radio" /><input name='gluten' type="radio" />
                    <span>Gluten Free Crust (+$1.00)</span>
                </label>

                {/* FOURTH PART, INSTRUCTIONS, TEXT INPUT */}

                <label><div className="choice-title">Special Instructions</div>
                    <input
                        type='text'
                        name='instructions'
                        onChange={onChange}
                        value={formValues.instructions}
                    ></input>
                </label>
                <button onClick={onClick}>Order</button>
            </form>
        </div>
    )
}