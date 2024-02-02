import { useState, useEffect } from "react"
import { getDataFromDB, getUrlImagesFromStorage } from "../services/supabaseClient"

function DashboardView() {
    const [ data, setData ] = useState(null)
    const [ urlImages, setUrlImages ] = useState(null)

    async function getDataInStorage() {
        const response = getDataFromDB()
        const data = await response.then(data => data)
        createDataGroup(data)
        setUrlImages(getUrlImagesFromStorage(data.map(item => item.image)))
    }

    function createDataGroup(arr) {
        let groups = []
        let newGroup = []

        arr?.forEach((item, index) => {
                if (newGroup.length < 25) {
                    newGroup.push(item)
                }
                  
                if(newGroup.length === 25) {
                    groups.push(newGroup)
                    newGroup = []
                }
                  
                if(newGroup.length >= 1 && arr.length - 1 === index) {
                    groups.push(newGroup)
                    newGroup = []
                }
            });

            setData(groups)
    }

    useEffect(() => {
        getDataInStorage()
    })

    return (
        <div className="dashboard">
            {
                data?.map((arr, index) => {
                    return (
                    <div key={index} className="collection">
                        <h1 className="collection-title">Colección #{index + 1}</h1>
                        <label htmlFor={index} className="collection-label">Open / Close</label>
                        <input type="checkbox" id={index} className="collection-input"/>
                        <div className="collection-cards">
                            {
                                arr?.map((card) => {
                                    return (
                                        <div key={card.id}>
                                            <img src={urlImages[card.image]} alt="" />
                                        </div>                                        
                                    )
                                })
                            }
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default DashboardView