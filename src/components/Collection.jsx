import { useState } from "react"
import { ArrowDropdown } from "./Icons"
import '../styles/Collection.css'

function Collection({arr, index, urls}) {
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className="collection">
            <div className="collection-actions">
                <button className="collection-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span className="collection-toggle-text">Colección #{index + 1}</span>
                    <ArrowDropdown></ArrowDropdown>
                </button>
                <button className="collection-download">Descargar colección</button>
            </div>
            <div className={isOpen ? "collection-list active" : "collection-list"}>
                {arr?.map(item => {
                    return (
                        <div className="collection-item" key={item.id}>
                            <img src={urls[item.image]} alt="" key={item.id} className="collection-item-image"/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 

export default Collection