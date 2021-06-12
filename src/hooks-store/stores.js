import { useState, useEffect } from 'react'
let globalState = {}
let listeners = []
let actions = {}

export const useStore = (shouldListen = true) => {
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload)
    globalState = { ...globalState, ...newState }
    for (listener of listeners) {
      listener(globalState)
    }
  }
  const setState = useState(globalState)[1]
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState)
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState)
      }
    }
  }, [setState, shouldListen])
  return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState }
  }
  actions = { ...actions, ...userActions }
}
