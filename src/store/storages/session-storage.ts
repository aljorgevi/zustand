import { StateStorage, createJSONStorage } from 'zustand/middleware'

export const storeService: StateStorage = {
	getItem: key => {
		const value = window.sessionStorage.getItem(key)
		return value ? JSON.parse(value) : null
	},
	setItem: (key, value) => {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	},
	removeItem: key => window.sessionStorage.removeItem(key)
}

export const sessionStorage = createJSONStorage(() => storeService)
