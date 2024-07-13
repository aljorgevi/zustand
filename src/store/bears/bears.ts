// This is a base for a zustand store, I'll use as Documentation for the zustand store

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Bear {
	id: number
	name: string
}

interface BearState {
	blackBears: number
	polarBears: number
	pandaBears: number
	bears: Bear[]
	incrementBlackBears: (by: number) => void
	intrementPolarBears: (by: number) => void
	intrementPandaBears: (by: number) => void
	addBear: () => void
	clearBears: () => void
	doNothing: () => void
	computed: {
		totalBears: number
	}
}

export const useBearStore = create<BearState>()(
	persist(
		(set, get) => ({
			computed: {
				get totalBears() {
					return get().blackBears + get().polarBears + get().pandaBears
				}
			},
			blackBears: 10,
			polarBears: 0,
			pandaBears: 0,
			bears: [
				{ id: 1, name: 'Black Bear' },
				{ id: 2, name: 'Polar Bear' },
				{ id: 3, name: 'Panda Bear' }
			],
			incrementBlackBears: (by: number) => set(state => ({ blackBears: state.blackBears + by })),
			intrementPolarBears: (by: number) => set(state => ({ polarBears: state.polarBears + by })),
			intrementPandaBears: (by: number) => set(state => ({ pandaBears: state.pandaBears + by })),
			doNothing: () => set(state => ({ bears: [...state.bears] })),
			addBear: () =>
				set(state => ({
					bears: [
						...state.bears,
						{
							id: state.bears.length + 1,
							name: 'Bear ' + (state.bears.length + 1)
						}
					]
				})),
			clearBears: () => set({ bears: [] })
		}),
		{
			name: 'bear-storage'
		}
	)
)
