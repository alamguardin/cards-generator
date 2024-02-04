import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION
const SUPABASE_CLIENT = import.meta.env.VITE_SUPABASE_CLIENT
const SUPABASE_GET_URL = import.meta.env.VITE_SUPABASE_GET
const SUPABASE_POST_URL = import.meta.env.VITE_SUPABASE_POST

const supabase = createClient(SUPABASE_CLIENT, API_KEY)

export async function getDataFromDB() {
    const response = await fetch(SUPABASE_GET_URL, {
        headers: {
            "apikey": API_KEY,
             "Authorization" : AUTHORIZATION
         }
    })
    
    const data = await response.json()
    return data
}

export async function setDataInDB(data) {
    await fetch(SUPABASE_POST_URL, {
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
}

export function getUrlImagesFromStorage(arr) {
    let urlsImages = {}

    for(let i = 0; i < arr.length; i++) {
       const imgUrl = supabase.storage.from('cards').getPublicUrl(`public/${arr[i]}`)
       urlsImages[arr[i]] = imgUrl.data.publicUrl
    }
    
    return urlsImages
}

export async function saveImageInStorage(name, image) {
    await supabase
        .storage
        .from('cards')
        .upload('public/' + name, image, {
            cacheControl: '3600',
            upsert: false
        }
    )
}

export async function downloadImageFromStorage(reference) {
    const { data, error } = await supabase
        .storage
        .from('cards')
        .download('public/' + reference)
    
    if(error) console.log(error)
    
    return data
}