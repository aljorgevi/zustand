import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { firebaseStorage } from '../storages/firebase'
import { logger } from '../middlewares/logger'

interface PersonState {
	firstName: string
	lastName: string
}

interface Actions {
	setFirstName: (firstName: string) => void
	setLastName: (lastName: string) => void
}

const logMiddleware = config => (set, get, api) =>
	config(
		args => {
			console.log('Previous state: ', get())
			console.log('Applied updates: ', args)
			set(args)
			console.log('Next state: ', get())
		},
		get,
		api
	)

export const usePersonStore = create<PersonState & Actions>()(
	logMiddleware(
		devtools(
			persist(
				set => ({
					firstName: '',
					lastName: '',
					setFirstName: firstName => set({ firstName }, false, 'setFirstName'),
					setLastName: lastName => set({ lastName }, false, 'setLastName')
				}),
				{ name: 'person-storage' }
			)
		)
	)
)
