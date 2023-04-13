import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, ButtonGroup, Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from './components/NavBar'

function App() {
  return <Grid templateAreas={{
    base: `"nav" "main"`, //mobile devices
    lg: `"nav nav" "aside main"` // for devices more than 1024px
  }}>
    <GridItem area='nav'>
      <NavBar />
    </GridItem>

    <Show above='lg'>
      <GridItem area='aside'>
        Aside
      </GridItem>
    </Show>

    <GridItem area='main'>
      Main
    </GridItem>
  </Grid>
}

export default App
