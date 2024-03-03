import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { MainPage } from './pages/MainPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Global />
    <MainPage />
  </QueryClientProvider>
)
