import { useState, useEffect } from "react"
import { getDataFromDB, getUrlImagesFromStorage } from "../services/supabaseClient"
import Collection from "../components/Collection"

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
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                {
                    data?.map((arr, index) => {
                        return (
                            <Collection
                                key={index}
                                arr={arr}
                                index={index}
                                urls={urlImages}
                            ></Collection>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DashboardView