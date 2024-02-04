import { useState } from "react"
import { ArrowDropdown, Close, Download } from "./Icons"
import '../styles/Collection.css'
import { downloadImageFromStorage } from "../services/supabaseClient"
import download from "downloadjs"

function Collection({arr, index, urls}) {
    const [ isOpen, setIsOpen ] = useState(false)

    async function handleDownloadImage(reference) {
        const imgFile = await downloadImageFromStorage(reference)
        download(imgFile, reference)
    }

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
                            <div className="collection-item-actions">
                                <button className="collection-item-download" onClick={() => handleDownloadImage(item.image)}>
                                    <Download></Download>
                                </button>
                                <button className="collection-item-delete">
                                    <Close></Close>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 

export default Collection