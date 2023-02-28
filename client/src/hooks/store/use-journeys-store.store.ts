import { create } from 'zustand'
import { apiService } from '../../services/api'
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
    const { data } = await apiService.get<Journey[]>('/journeys')

    set({ journeys: data })
  },
}))
