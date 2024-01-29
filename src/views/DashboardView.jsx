import { useState, useEffect } from "react"
import Card from "../components/Card"


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
                        <label htmlFor={index}>Open / Close</label>
                        <input type="checkbox" id={index}/>
                        <div>
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