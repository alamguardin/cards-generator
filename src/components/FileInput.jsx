import '../styles/FileInput.css'

function FileInput({nameFile, onChange, onClick}) {
    return (
        <div className="file-input">
            <div className="file-input-section">
                <label htmlFor="fileInput" className="file-input-as-button">Selecionar Imagen</label>
                <input type="file" id="fileInput" className="file-input-field" onChange={onChange}/>
                <p className="file-input-name">{nameFile}</p>
            </div>
            <button className="file-input-upload" onClick={onClick}>Subir</button>
        </div>
    )
}

export default FileInput