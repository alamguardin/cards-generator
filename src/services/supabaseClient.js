import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTHORIZATION = import.meta.env.VITE_AUTHORIZATION
const SUPABASE_GET_URL = import.meta.env.VITE_SUPABASE_GET 
const SUPABASE_CLIENT = import.meta.env.VITE_SUPABASE_CLIENT

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

export function getUrlImagesFromStorage(arr) {
    let urlsImages = {}

    for(let i = 0; i < arr.length; i++) {
       const imgUrl = supabase.storage.from('cards').getPublicUrl(`public/${arr[i]}`)
       urlsImages[arr[i]] = imgUrl.data.publicUrl
    }
    
    return urlsImages
}