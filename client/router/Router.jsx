import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react'

import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const historyContext = createContext({})

let recents = []

const urlReg = /\/([1-9][0-9]*)/

function getIndex(url) {
  const match = urlReg.exec(url)

  if (match) {
    return parseInt(match[1])
  }

  console.warn('index not match, make sure your url look like this: /:index')
  return 0
}

export default function Router({ children }) {
  const [location, setLocation] = useState(history.location)

  const [index, setIndex] = useState(getIndex(history.location.pathname))

  const next = useCallback(() => {
    history.push(`/${index + 1}`)
    // recents.push(index)
  }, [index])

  const back = useCallback(() => {
    // if (recents[recents.length - 1] - 1 === recents[recents.length - 2]) {
    //   history.goBack()
    //   // recents.splice(-1, 1)
    //   recents.pop()
    // } else {
    //   const index = recents.pop()
    //   recents = [index - 1]
    //   history.push(index)
    // }
    history.goBack()
  }, [])

  const context = useMemo(
    () => ({
      location,
      history,
      next,
      back,
      index,
    }),
    [location, next, back, index],
  )

  useEffect(() => {
    const unListen = history.listen((location, action) => {
      console.log(action, location)
      const index = getIndex(location.pathname)
      if (index === 0) {
        history.replace('/1')
        return
      }
      setLocation(location)
      setIndex(index)
    })

    return unListen
  }, [])

  // redirect at beginning
  useEffect(() => {
    const index = getIndex(location.pathname)
    if (index === 0) {
      history.replace('/1')
      return
    }
  }, [])

  return (
    <historyContext.Provider value={context}>
      {children}
    </historyContext.Provider>
  )
}

export function useRouter() {
  return useContext(historyContext)
}
