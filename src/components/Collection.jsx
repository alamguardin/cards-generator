import { useState } from "react"
import { ArrowDropdown, Close, Download } from "./Icons"
import '../styles/Collection.css'
import { deleteImageInStorage, deleteIteminDB, downloadImageFromStorage } from "../services/supabaseClient"
import download from "downloadjs"
import { nodeToDataurl } from "../utils/nodeToDataurl"

function Collection({arr, index, urls}) {
    const [ isOpen, setIsOpen ] = useState(false)

    async function handleDownloadCollection(index) {
        const originNode = document.querySelector(`.collection #index-${index}`)
        const clone = originNode.cloneNode(true)
        clone.classList.replace('collection-list', 'collection-list-clone')
        document.querySelector(`.collection-image${index}`).appendChild(clone)
        const newNode = await nodeToDataurl(document.querySelector(`.collection-image${index} .collection-list-clone`))
        download(newNode, 'coleccion-' + index + '.png')
        document.querySelector(`.collection-image${index}`).innerHTML = ''
    }

    async function handleDeleteCard(id, reference) {
        await deleteIteminDB(id)
        await deleteImageInStorage(reference)
    }

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
                <button className="collection-download" onClick={() => handleDownloadCollection(index)}>Descargar colección</button>
            </div>
            <div className={isOpen ? "collection-list active" : "collection-list"} id={'index-' + index}>
                {arr?.map(item => {
                    return (
                        <div className="collection-item" key={item.id}>
                            <img src={urls[item.image]} alt="" key={item.id} className="collection-item-image"/>
                            <div className="collection-item-actions">
                                <button className="collection-item-download" onClick={() => handleDownloadImage(item.image)}>
                                    <Download></Download>
                                </button>
                                <button className="collection-item-delete" onClick={() => handleDeleteCard(item.id, item.image)}>
                                    <Close></Close>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={'collection-clone collection-image'+index} >

            </div>
        </div>
    )
} 

export default Collection