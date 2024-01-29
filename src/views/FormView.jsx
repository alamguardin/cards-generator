// import core Packages
import { useState } from 'react'
// import third party
import { createClient } from '@supabase/supabase-js'
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { Toaster, toast } from 'sonner'
// import components
import NumberInput from '../components/NumberInput'
import Card from '../components/Card'
import TextInput from '../components/TextInput'
import FileInput from '../components/FileInput'
import SelectInput from '../components/SelectInput'
import TextareaInput from '../components/TextareaInput';
// import assets
import { Download } from '../components/Icons'
// import const
import { RARITY_AND_CLASS_OPTIONS, TYPE_CARD_OPTIONS } from '../utils/const';

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION
const SUPABASE_CLIENT = import.meta.env.VITE_SUPABASE_CLIENT
const SUPABASE_POST_URL = import.meta.env.VITE_SUPABASE_POST

// Create supabase client for upload files
const supabase = createClient(SUPABASE_CLIENT, API_KEY)

function FormView() {
  // Card Items state
  const [ type, setType ] = useState('unit')
  const [ name, setName ] = useState('')
  const [ keywords, setKeywords ] = useState('')
  const [ effect, setEffect ] = useState('')
  const [ footer, setFooter ] = useState('')
  const [ attack, setAttack] = useState (0)
  const [ life, setLife ] = useState(0)
  const [ manna, setManna ] = useState(0)
  const [ rarity, setRarity ] = useState('white')
  const [ classCard, setClassCard] = useState('white')
  const [ movements, setMovements ] = useState(0)
  const [ imageReference, setImageReference ] = useState('')
  // Storage Items state
  const [ file, setFile ] = useState(null)
  const [ urlFile, setUrlFile ] = useState(null)

  /**
   * Save an image in supabase storage
   */
  async function saveImageInStorage() {
      const { data, error } = await supabase
        .storage
        .from('cards')
        .upload('public/' + imageReference, file, {
          cacheControl: '3600',
          upsert: false
        })
      console.log(data)
      console.log(error)
  }

  /**
   * Save all information card in supabase table
   */
  async function saveDataInDB() {
    // this is the object to save in DB
    const data = {
      type: type,
      name: name,
      keywords: keywords,
      effect: effect,
      footer: footer,
      class: classCard,
      rarity: rarity,
      manna: manna,
      attack: attack,
      life: life,
      movements: movements,
      image: imageReference
    }

    const response = await fetch(SUPABASE_POST_URL, {
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

    saveImageInStorage()
    toast.success('Tarjeta creada satisfactoriamente.')
    const dat = await response.json()
    console.log(dat)
  }

  /**
   * Convert a node to png and download
   */
  function handleDownload() {
    const node = document.querySelector('.preview .card')

    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png')
      });
  }

  /**
   * Read a file type object for preview
   * @param {node} e this is element
   */
  function handleUploadFile(e) {
    e.preventDefault()

    const reader = new FileReader()

    reader.onload = ((e) => setUrlFile(e.target.result))
    reader.readAsDataURL(file);
    const fileName = 'node'+ Date.now() +'.png'
    setImageReference(fileName)
  }

  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="title">Crear nueva carta</h1>
          <SelectInput
            label="Tipo"
            options={TYPE_CARD_OPTIONS}
            onChange={(e) =>  setType(e.target.value)}
            value={type}
          ></SelectInput>
          <TextInput label="Nombre" onChange={(e) => setName(e.target.value)}></TextInput>
          <TextInput label="Palabras clave" onChange={(e) => setKeywords(e.target.value)}></TextInput>
          <TextareaInput 
            label='Efecto'
            onChange={(e) => setEffect(e.target.value)}
          ></TextareaInput>
          <TextInput label="Pie de carta" onChange={(e) => setFooter(e.target.value)}></TextInput>
          <FileInput 
            nameFile={ file ? file.name : 'Sin Seleccionar' }
            onChange={(e) => setFile(e.target.files[0])}
            onClick={handleUploadFile}
          ></FileInput>
          <SelectInput 
            label="Clase" 
            options={RARITY_AND_CLASS_OPTIONS}
            onChange={(e) => setClassCard(e.target.value)}
            value={classCard}
          ></SelectInput>
          <SelectInput
            label='Rareza'
            options={RARITY_AND_CLASS_OPTIONS}
            onChange={(e) => setRarity(e.target.value)}
            value={rarity}
          ></SelectInput>
          <NumberInput 
            label='Movimientos'
            value={movements}
            increase={() => setMovements(movements + 1)}
            decrease={() => setMovements(movements - 1)}
          ></NumberInput>
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
          <button onClick={saveDataInDB}>Crear tarjeta</button>
        </div>
        <div className="preview">
          <Card 
            type={type}
            classCard={classCard}
            rarity={rarity}
            name={name}
            image={urlFile}
            manna={manna}
            attack={attack}
            life={life}
            keywords={keywords}
            effect={effect}
            footer={footer}
            movements={movements}
          ></Card>
          <button onClick={handleDownload} className="download-button">
            <Download></Download>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormView
