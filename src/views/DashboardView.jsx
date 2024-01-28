import { useState, useEffect } from "react"


function DashboardView() {
    const [ data, setData ] = useState(null)

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://gbxzbehqxjynwohsrvsm.supabase.co/rest/v1/cards-data?select=*', {
                headers: {
                "apikey": import.meta.env.VITE_API_KEY,
                "Authorization" : import.meta.env.VITE_AUTHORIZATION
                }
            })
            const cards = await response.json()

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
        <div className="container">
            {
                data?.map((arr, index) => {
                    return (
                    <div key={index}>
                        <h1>Colección #{index + 1}</h1>
                        {
                            arr?.map((card, index) => {
                                return (
                                    <p key={index}>{card.name}</p>
                                )
                            })
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}

export default DashboardView