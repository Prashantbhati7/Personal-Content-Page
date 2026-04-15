import { useEffect } from 'react'
import { BuilderLayout } from './components/layout/BuilderLayout'
import { initializeStoreFromStorage } from './store/useBuilderStore'

function App() {
  useEffect(() => {
    initializeStoreFromStorage();
  }, []);

  return <BuilderLayout />
}

export default App
