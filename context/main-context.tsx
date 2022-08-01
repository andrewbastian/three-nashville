
import { createContext, useContext, useState } from 'react'

const KeyContext = createContext(undefined)

export function KeyProvider({ children }) {
  const [musicalKey, setMusicalKey] = useState({})
  return (
    <KeyContext.Provider
      value={{
        musicalKey,
        setMusicalKey,
      }}
    >
      {children}
    </KeyContext.Provider>
  )
}

export function useKey() {
  const context = useContext(KeyContext)

  if (!context)
    throw new Error('useKey must be used inside a `KeyProvider`')

  return context
}
