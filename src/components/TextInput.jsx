import '../styles/TextInput.css'

function TextInput({label, onChange, value}) {
    return (
        <div className="text-input">
            <label htmlFor="textInput" className="text-input-label">{label}</label>
            <input type="text" value={value} id="textInput" className="text-input-field" placeholder="Escribe un nombre" onChange={onChange}/>
        </div>
    )
}

export default TextInput