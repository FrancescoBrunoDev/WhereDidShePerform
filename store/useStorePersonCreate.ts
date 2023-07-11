import { Occupation, Occupations } from "@prisma/client"
import { create } from "zustand"

interface DataFormat {
  birth: boolean
  death: boolean
}

interface StorePersonCreate {
  dataFormat: DataFormat
  personTitle: {
    first_name: string
    last_name: string
  }
  occupationFormData: Occupations[]
  setBirth: (birth: boolean) => void
  setDeath: (death: boolean) => void
  setFirstName: (first_name: string) => void
  setLastName: (last_name: string) => void
  setOccupationFormData: (occupationtype: string) => void
}

export const useStorePersonCreate = create<StorePersonCreate>()((set) => ({
  dataFormat: {
    birth: false,
    death: false,
  },
  personTitle: {
    first_name: "",
    last_name: "",
  },
  occupationFormData: [],

  setBirth: (birth) => {
    set((state: StorePersonCreate) => {
      const dataFormat = { ...state.dataFormat, birth }
      return { dataFormat }
    })
  },

  setDeath: (death) => {
    set((state: StorePersonCreate) => {
      const dataFormat = { ...state.dataFormat, death }
      return { dataFormat }
    })
  },
  setFirstName: (first_name: string) => {
    set((state: StorePersonCreate) => {
      const personTitle = { ...state.personTitle, first_name }
      return { personTitle }
    })
  },
  setLastName: (last_name: string) => {
    set((state: StorePersonCreate) => {
      const personTitle = { ...state.personTitle, last_name }
      return { personTitle }
    })
  },
  setOccupationFormData: (occupationtype: string) => {
    set((state: StorePersonCreate) => {
      const isOccupationPresent = state.occupationFormData.some(
        (occupationData) => occupationData.occupation === occupationtype
      )

      if (isOccupationPresent) {
        const updatedOccupationData = state.occupationFormData.filter(
          (occupationData) => occupationData.occupation !== occupationtype
        )
        return { occupationFormData: updatedOccupationData }
      }

      const newOccupationData = [
        ...state.occupationFormData,
        { occupation: occupationtype as Occupation, personUid: "new", id: 0 },
      ]
      return { occupationFormData: newOccupationData }
    })
  },
}))
