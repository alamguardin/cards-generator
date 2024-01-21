import * as htmlToImage from 'html-to-image';
import { Toaster, toast } from 'sonner'
import { useState } from 'react'
import NumberInput from './components/NumberInput'
import Card from './components/Card'
import TextInput from './components/TextInput'
import FileInput from './components/FileInput'
import SelectInput from './components/SelectInput'
import { Download } from './components/Icons'
import download from 'downloadjs';

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION

const rarityOptions = [
  {label: 'Blanco', value: 'white'},
  {label: 'Rojo', value: 'red'},
  {label: 'Morado', value: 'purple'},
  {label: 'Dorado', value: 'gold'},
  {label: 'Verde', value: 'green'},
  {label: 'Azul', value: 'blue'},
]

function App() {
  const [ name, setName ] = useState('')
  const [ file, setFile ] = useState(null)
  const [ urlFile, setUrlFile ] = useState(null)
  const [ attack, setAttack] = useState (0)
  const [ life, setLife ] = useState(0)
  const [ manna, setManna ] = useState(0)
  const [ rarity, setRarity ] = useState('white')

  async function setCard() {
    const data = {
      name,
      rarity,
      manna,
      attack,
      life
    }
    const response = await fetch('https://gbxzbehqxjynwohsrvsm.supabase.co/rest/v1/cards-data', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization" : AUTHORIZATION
      },
      body: JSON.stringify(data)
    })
    console.log(API_KEY)
    console.log(AUTHORIZATION)
    toast.success('Tarjeta creada satisfactoriamente.')
    const dat = await response.json()
    console.log(dat)
  }

  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch('https://gbxzbehqxjynwohsrvsm.supabase.co/rest/v1/cards-data?select=*', {
  //       headers: {
  //         "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieHpiZWhxeGp5bndvaHNydnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0MDUyNzYsImV4cCI6MjAxNDk4MTI3Nn0.ueUYywK0Kk2kf5xvT7Y_FulRUuoa92wtXaur3CE6hvQ",
  //         "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieHpiZWhxeGp5bndvaHNydnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0MDUyNzYsImV4cCI6MjAxNDk4MTI3Nn0.ueUYywK0Kk2kf5xvT7Y_FulRUuoa92wtXaur3CE6hvQ"
  //       }
  //     })
  //     const cards = await response.json()
  //     console.log(cards)
  //   }

  //   getData()
  // })
  function handleDownload() {
    const node = document.querySelector('.preview .card')

    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png')
      });
  }

  function handleUploadFile(e) {
    e.preventDefault()

    const reader = new FileReader()

    reader.onload = ((e) => setUrlFile(e.target.result))
    reader.readAsDataURL(file);

  }

  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="title">Crear nueva carta</h1>
          <TextInput label="Nombre" onChange={(e) => setName(e.target.value)}></TextInput>
          <FileInput 
            nameFile={ file ? file.name : 'Sin Seleccionar' }
            onChange={(e) => setFile(e.target.files[0])}
            onClick={handleUploadFile}
          ></FileInput>
          <SelectInput 
            label="Rarity" 
            options={rarityOptions}
            onChange={(e) => setRarity(e.target.value)}
            value={rarity}
          ></SelectInput>
          <NumberInput 
            label='Mana' 
            value={manna} 
            increase={() => setManna(manna + 1)}
            decrease={() => setManna(manna - 1)}
          ></NumberInput>
          <NumberInput 
            label='Ataque' 
            value={attack} 
            increase={() => setAttack(attack + 1)}
            decrease={() => setAttack(attack - 1)}
          ></NumberInput>
          <NumberInput 
            label='Vida' 
            value={life} 
            increase={() => setLife(life + 1)}
            decrease={() => setLife(life - 1)}
          ></NumberInput>
          <Toaster position="top-center"></Toaster>
          <button onClick={setCard}>Crear tarjeta</button>
        </div>
        <div className="preview">
          <Card 
            rarity={rarity}
            name={name}
            image={urlFile}
            manna={manna}
            attack={attack}
            life={life}
          ></Card>
          <button onClick={handleDownload} className="download-button">
            <Download></Download>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
