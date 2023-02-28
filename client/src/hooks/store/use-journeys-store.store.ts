import { create } from 'zustand'
import { Journey } from '../../types/journey.type'

interface JourneysStore {
  journeys: Journey[]
  getAvailableJourneys: () => Promise<void>
}

export const useJourneysStore = create<JourneysStore>((set) => ({
  journeys: [
    { name: 'Test', slug: 'test' },
    { name: 'Test2', slug: 'test2' },
  ],

  getAvailableJourneys: async () => {
    set({ journeys: [{ name: 'Test', slug: 'test' }] })
  },
}))
