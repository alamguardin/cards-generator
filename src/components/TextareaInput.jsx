import '../styles/TextareaInput.css'

function TextareaInput({label, onChange}) {
    return (
        <div className="textarea-input">
            <label htmlFor="" className="textarea-input-label">{label}</label>
            <textarea className="textarea-input-field" onChange={onChange}></textarea>
        </div>
    ) 
}

export default TextareaInput