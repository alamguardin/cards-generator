import { expect, test } from 'vitest'
import { getDataFromDB, setDataInDB } from './supabaseClient'

test('request data from an api return an array', () => {
    expect(getDataFromDB()).toBeTypeOf('object')
})

test('set data in database should be succesfully', () => {
    const data = {
        type: '',
        name: 'Yourself',
        keywords: '',
        effect: '',
        footer: '',
        class: '',
        rarity: '',
        manna: 10,
        attack: 7,
        life: 6,
        movements: 5,
        image: ''
      }
    
    const response = setDataInDB(data)

    expect(response["status"]).toBe(201)
})