// import core Packages
import { useState } from 'react'
// import third party
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
import dataURLtoFile from '../utils/dataurlToFile';
import { saveImageInStorage, setDataInDB } from '../services/supabaseClient';
import { nodeToDataurl } from '../utils/nodeToDataurl';

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

	function handleResetForm() {
		setType('unit')
		setName('')
		setKeywords('')
		setEffect('')
		setFooter('')
		setAttack(0)
		setFile(0)
		setManna(0)
		setRarity('white')
		setClassCard('white')
		setMovements(0)
		setImageReference('')
		setFile(null)
		setUrlFile(null)
	}

	/**
	 * Save all information card in supabase table
	 */
	async function handleSaveDatainDB() {
		const node = await nodeToDataurl(document.querySelector('.preview .card'))
		const newImage = dataURLtoFile(node, imageReference)
		saveImageInStorage(imageReference, newImage)

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
		setDataInDB(data)
		handleResetForm()
		toast.success('Tarjeta creada satisfactoriamente.')
	}

	/**
	 * Convert a node to png and download
	 */
	async function handleDownload() {
		const node = await nodeToDataurl(document.querySelector('.preview .card'))
		download(node, 'card' + Date.now() + '.png')
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
					<TextInput label="Nombre" value={name} onChange={(e) => setName(e.target.value)}></TextInput>
					<TextInput label="Palabras clave" value={keywords} onChange={(e) => setKeywords(e.target.value)}></TextInput>
					<TextareaInput 
						label='Efecto'
						value={effect}
						onChange={(e) => setEffect(e.target.value)}
					></TextareaInput>
					<TextInput label="Pie de carta" value={footer} onChange={(e) => setFooter(e.target.value)}></TextInput>
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
					<button onClick={handleSaveDatainDB}>Crear tarjeta</button>
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
