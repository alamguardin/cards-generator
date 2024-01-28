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
            setData(cards)
        }
        getData()
    }, [])

    return (
        <div className="container">
            
        </div>
    )
}

export default DashboardView