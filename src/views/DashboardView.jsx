import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_API_KEY
const SUPABASE_CLIENT = import.meta.env.VITE_SUPABASE_CLIENT

const supabase = createClient(SUPABASE_CLIENT, API_KEY)


function DashboardView() {
    const [ data, setData ] = useState(null)
    const [ urls, setUrls ] = useState(null)

    function getUrlImagesFromStorage(arr) {
        let urlsImages = {}
        for(let i = 0; i < arr.length; i++) {
           const imgUrl = supabase.storage.from('cards').getPublicUrl(`public/${arr[i]}`)
           urlsImages[arr[i]] = imgUrl.data.publicUrl
        }
        console.log(urlsImages)
        setUrls(urlsImages)
    }

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://gbxzbehqxjynwohsrvsm.supabase.co/rest/v1/cards-data?select=*', {
                headers: {
                "apikey": import.meta.env.VITE_API_KEY,
                "Authorization" : import.meta.env.VITE_AUTHORIZATION
                }
            })
            const cards = await response.json()

            const imgReferences = cards.map((card) => card.image)
            getUrlImagesFromStorage(imgReferences)

            let dataSet = []
            let newSet = []

            cards?.forEach((card, index) => {
                if (newSet.length < 25) {
                    newSet.push(card)
                }
                  
                if(newSet.length === 25) {
                    dataSet.push(newSet)
                    newSet = []
                }
                  
                if(newSet.length >= 1 && cards.length - 1 === index) {
                    dataSet.push(newSet)
                    newSet = []
                }
            });

            setData(dataSet)
        }
        getData()
    }, [])

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
                                            <img src={urls[card.image]} alt="" />
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