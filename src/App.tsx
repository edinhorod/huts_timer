import { ThemeProvider } from 'styled-components'
import {BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { CyclesContexProvider } from './contexts/CyclesContext'

export function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContexProvider>
          <Router />
        </CyclesContexProvider>
        <GlobalStyle />
      </ThemeProvider>    
    </BrowserRouter>
  )
}
