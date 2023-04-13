1- Create the project with npm
    1.1- npm create vite@latest (vite@4.1.0)
    1.2- project name: react-game-hub
    1.3- framework: React
    1.4- variant: Typescript

2- Go inside the 'react-game-hub'
    2.1- npm i (to install all dependencies)    

3- Run the npm server
    3.1- npm run dev

4- Initialize Git repository (optional)
    4.1- git init
    4.2- git add .
    4.3- git commit -m "Initial commit"

5- Install chakra from chakra-ui.com
    5.1- on framework guide select chakra for vite
    5.2- npm i @chakra-ui/react @emotion/react @emotion/    styled framer-motion
    5.3- add a provider
        5.3.1- on main.tsx
        5.3.2- import { ChakraProvider } from '@chakra-ui/react'
        5.3.3- wrap app component with chakra provider:
            <React.StrictMode>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </React.StrictMode>,

6- If you want to customize your theme (optional)
    6.1- import { extendTheme } from '@chakra-ui/react'
    6.2- must look like this:
    6.2.1- Extend the theme to include custom colors, fonts, etc
        const colors = {
            brand: {
                900: '#1a365d',
                800: '#153e75',
                700: '#2a69ac',
            },
        }
        const theme = extendTheme({ colors })
    6.3- in the provider add the theme like this:
        6.3.1- <React.StrictMode>
                    <ChakraProvider theme={theme}>
                        <App />
                    </ChakraProvider>
                </React.StrictMode>,

7- add components from chakra ui
    7.1- can be found in he same chakra vite page
    7.2- for example adding a button
    7.3- import { Button, ButtonGroup } from '@chakra-ui/react'
    7.4- And return <Button colorScheme='blue'>Button</Button>;
    7.5- can customize size with size='xs','sm', 'md', 'lg'

8- delete everything inside index.css, it's not going to be use

9- commit your changes to git

10- if you want to see you git log
    10.1- git log --oneline

11- create a responsive layout
    11.1- use Grid from chakra ui
    11.2- <Grid templateAreas={`"nav nav" "aside main"`}></Grid>
    11.3- next inside Grid lets add GridItem
    11.4 - <GridItem area='nav' bg='coral'>Nav</GridItem>
           <GridItem area='aside'bg='gold'>Aside</GridItem>
           <GridItem area='main' bg='dodgerblue'>Main</GridItem>

12- Build a navigation bar
    12.1- create folder components in scr folder
    12.2- inside create NavBar.tsx
    12.3- create an horizontal stack <HStack></HStack>  
    13.4- <HStack>
            <Image src={logo} boxSize='60px' />
            <Text>NavBar</Text>
          </HStack>  

13- Any image like logo goes inside assets folder
    13.1- import images like any other component
    13.2- import logo from '../assets/Logo/logo.webp';

14- Implementing dark mode (chakra ui: color mode)
    14.1- in scr folder create file theme.ts
    14.2- import { extendTheme, ThemeConfig } from "@chakra-ui/react";
    14.3- const config: ThemeConfig = {
          initialColorMode: 'dark'
          };
    14.4- export default this extendTheme({config}) with a   constant
    14.5- add to main this on chakra provider and the color scriptmode
    15.6- <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
    15.7- before refresh go to inspect->application->local and delete chakra-ui-color-mode which is set to light
    15.8- now refresh
    
