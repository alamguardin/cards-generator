import '../styles/SelectInput.css'

function SelectInput({label, options, onChange, value}) {
    return (
        <div className="select-input">
            <label className="select-input-label">{label}</label>
            <select id="seletcInput" className="select-input-field" onChange={onChange} value={value}>
                {options.map((option, index) => (
                    <option value={option.value} key={index}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput