import { useState, useEffect } from "react"
import Card from "../components/Card"
import PreviewCard from "../components/PreviewCard"
// import { createClient } from '@supabase/supabase-js'

// const API_KEY = import.meta.env.VITE_API_KEY
// const SUPABASE_CLIENT = import.meta.env.VITE_SUPABASE_CLIENT

// const supabase = createClient(SUPABASE_CLIENT, API_KEY)

// const publicUrl = supabase.storage.from('cards').getPublicUrl('public/node1706481747202.png')

// console.log(publicUrl)

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
                                        <Card
                                            key={card.id}
                                            type={card.type}
                                            classCard={card.class}
                                            rarity={card.rarity}
                                            name={card.name}
                                            image={card.urlFile}
                                            manna={card.manna}
                                            attack={card.attack}
                                            life={card.life}
                                            keywords={card.keywords}
                                            effect={card.effect}
                                            footer={card.footer}
                                            movements={card.movements}
                                        ></Card>
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