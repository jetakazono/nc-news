import { useState } from "react";

export const Select = ({ options, name, value, onChange }) => {
    const [currValue, setCurrValue] = useState(value)

    const handleChange = (e) => {
        setCurrValue(e.target.value)
        onChange(e.target.value, name)
    }

    return (<>        
        <label className="mr-6">
            <select 
                className="cursor-pointer ml-4" 
                name={name}
                onChange={handleChange} 
                value={currValue}
            >
                { options.map(({value, label}) => <option key={value} value={value}>
                    {label}
                </option>)}
            </select>
        </label> 
    </>)
}