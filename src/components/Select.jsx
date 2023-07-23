import { useEffect, useState } from "react";

export const Select = ({className, options, name, value, onChange, label, labelKey = "label", valueKey = "value"}) => {
    const [currValue, setCurrValue] = useState(value)

    const handleChange = (e) => {
        const val = e.target.value
        setCurrValue(val)
        const item = options.find( item => item[valueKey] === val )
        onChange(name, item)
    }

    useEffect(() => setCurrValue(value),[value])

    return (<>
        <label className="mr-3 text-gray-500 text-sm">
            { label && <span className="mr-3">{label}</span> }
            <select 
                className={`${className} cursor-pointer outline-none border rounded-lg border-gray-200 text-sm px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-primary focus:ring-primary focus:text-primary`} 
                name={name}
                onChange={handleChange} 
                value={currValue}
            >
                { options.map((item) => <option key={item[valueKey]} value={item[valueKey]}>
                    {item[labelKey]}
                </option>)}
            </select>
        </label> 
    </>)
}