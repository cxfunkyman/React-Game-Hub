import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, ButtonGroup, Grid, GridItem, Show } from '@chakra-ui/react'

function App() {
  return <Grid templateAreas={{
    base: `"nav" "main"`, //mobile devices
    lg: `"nav nav" "aside main"` // for devices more than 1024px
  }}>
    <GridItem area='nav' bg='coral'>
      Nav
    </GridItem>

    <Show above='lg'>
      <GridItem area='aside'bg='gold'>
        Aside
      </GridItem>
    </Show>

    <GridItem area='main' bg='dodgerblue'>
      Main
    </GridItem>
  </Grid>
}

export default App
