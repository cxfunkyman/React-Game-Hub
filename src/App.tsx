import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, ButtonGroup, Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import GameGrid from './components/GameGrid'

function App() {
  return <Grid 
  templateAreas={{
    base: `"nav" "main"`, //mobile devices
    lg: `"nav nav" "aside main"`, // for devices more than 1024px
  }}
  templateColumns={{
    base: '1fr',
    lg: '250px 1fr'
  }}
  >
    <GridItem area='nav'>
      <NavBar />
    </GridItem>

    <Show above='lg'>
      <GridItem area='aside'>
        Aside
      </GridItem>
    </Show>

    <GridItem area='main'>
      <GameGrid />
    </GridItem>
  </Grid>
}

export default App
