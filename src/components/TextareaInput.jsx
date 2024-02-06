import '../styles/TextareaInput.css'

function TextareaInput({label, onChange, value}) {
    return (
        <div className="textarea-input">
            <label htmlFor="" className="textarea-input-label">{label}</label>
            <textarea value={value} className="textarea-input-field" onChange={onChange} placeholder='Agrega una descripción'></textarea>
        </div>
    ) 
}

export default TextareaInput