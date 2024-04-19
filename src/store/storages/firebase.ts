import { StateStorage, createJSONStorage } from 'zustand/middleware'

const FIREBASE_URL = 'https://zustand-storage-udemy-course-default-rtdb.europe-west1.firebasedatabase.app/course/'

export const storeService: StateStorage = {
	getItem: async key => {
		try {
			const data = await fetch(FIREBASE_URL + key + '.json')

			if (!data.ok) {
				throw new Error('Could not fetch data')
			}

			const response = await data.json()
			return JSON.stringify(response)
		} catch (error) {
			console.error(error)
			throw new Error('Could not fetch data ')
		}
	},
	setItem: async (key, value) => {
		try {
			const response = await fetch(FIREBASE_URL + key + '.json', {
				method: 'PUT',
				body: value
			})

			if (!response.ok) {
				throw new Error('Could not store data')
			}
		} catch (error) {
			console.error(error)
			throw new Error('Could not store data')
		}
	},
	removeItem: key => window.sessionStorage.removeItem(key)
}

export const firebaseStorage = createJSONStorage(() => storeService)
