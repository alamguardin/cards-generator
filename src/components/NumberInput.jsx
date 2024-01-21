import { Add, Subtract } from '../components/Icons'
import '../styles/NumberInput.css'

function NumberInput({label, value, increase, decrease}) {
    return (
        <div className="number-input">
            <label htmlFor="" className="number-input-label">{label}</label>
            <div className='number-input-container'>
                <button onClick={decrease} className="number-input-button subtract">
                    <Subtract></Subtract>
                </button>
                <span className="number-input-value">{value}</span>
                <button onClick={increase} className="number-input-button add">
                    <Add></Add>
                </button>
            </div>
        </div>
    )
}

export default NumberInput