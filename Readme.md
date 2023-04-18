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
    14.5- add to main.tsx this on chakra provider and the color scriptmode
    15.6- <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
    15.7- before refresh go to inspect->application->local and delete chakra-ui-color-mode which is set to light
    15.8- now refresh

16- Build color mode switch
    16.1- in components create file ColorModeSwitch.tsx
    16.2- import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'
    16.3- const {toggleColorMode, colorMode} = useColorMode();
    16.4- <HStack>
            <Switch 
                colorScheme='green'
                isChecked={colorMode === 'dark'} 
                onChange={toggleColorMode}/>
            <Text>Dark Mode</Text>
          </HStack>
    16.5- now add to navbar.tsx
    16.6- import ColorModeSwitch from './ColorModeSwitch';
    16.7- <HStack>
            <Switch 
                colorScheme='green'
                isChecked={colorMode === 'dark'} 
                onChange={toggleColorMode}/>
            <Text>Dark Mode</Text>
          </HStack>

17- Install axios for HTTP request
    17.1- npm i axios
    17.2- let's create a custom service
    17.3- create folder services in scr folder
    17.4- create file api-client.ts
    17.5- import axios from "axios";
    17.6- axios.create({
            baseURL: 'Your URL goes here',
            params: {                
                key: 'Your api key goes here'
            }
           })

18- Fetching games form rawg api
    18.1- go to rawg.io login or sign up
    18.2- if still free ask for api key
    18.3- copy the api key and paste it on api-clients.ts
    18.4- go to rawg.io/apidocs click on read documentation on top of get API Key
    18.5- click on 'get /games' and copy the link
    18.6- inside components create file GameGrid.tsx
    18.7- const [games, setGames] = useState ([]);
    18.8- const [error, setError] = useState('');
    18.9- import apiClient from '../services/api-client';
    18.10- useEffect(() => {
            apiClient.get('games')
            .then(res => setGames())
           })
    18.11- use typescript to define an interface that represents the shape of the response object
    18.12- interface Game {
            id: number;
            name: string;
           }
           interface FetchGamesResponse {
            count: number;
            results: Game[];
           }
    18.13- const [games, setGames] = useState<Game[]> ([]);
    18.14- const [error, setError] = useState('');
    18.15- useEffect(() => {
            apiClient.get<FetchGamesResponse>('games')
            .then(res => setGames(res.data.results))
            .catch(err => setError(err.message));
           }, [])
    18.16- inside the return
           <>
              {error && <Text>{error}</Text>}
              <ul>
                {games.map(game => <li key={game.id}>{game.name}</li>)}
              </ul>
            </>
    18.17- in App.tsx on main GridItem add <GameGrid />

19- Create a custom hook for fetching
    19.1- inside scr create folder hooks
    19.2- inside hooks create file useGames.ts
    19.3- cut intefaces and useState, useEffect from GameGrid.tsx
        const [games, setGames] = useState<Game[]> ([]);
        const [error, setError] = useState('');
        useEffect(() => {
            apiClient
            .get<FetchGamesResponse>('games')
            .then(res => setGames(res.data.results))
            .catch(err => setError(err.message));
        }, []);
    19.4- put in useGames.ts
    19.5- in GameGrid.tsx add 
            const {games, error} = useGames();

20- Build game cards
    20.1- in components create file GameCard.tsx
    20.2- create a Props interface
    20.3- interface Props {
            game: Game;
          }
    20.4- return <Card>
                    <Image src={game.background_image}/>
                    <CardBody>
                        <Heading>{game.name}</Heading>
                    </CardBody>
                 </Card>
    20.5- on GameGrid.tsx replace the ul for SimpleGrid
    20.6- add the column and spacing size
    20.7- <SimpleGrid 
            columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} 
            spacing={10}>
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
    20.8- on GameCard.tsx add to Card 2 properties
    20.9- <Card borderRadius={10} overflow='hidden'>
    20.10- fix heading size with predefined size on chakra
    20.11- <Heading fontSize='1xl'>

21- Displaying icons
    21.1- add the parent platform property to each interface from the game json list on game interface from useGames.ts
    21.2- create a new interface
    21.3- interface Platform {
            id: number;
            name: string;
            slug: string;
          }
    21.4- add to game interface
    21.5- parent_platforms: { platform: Platform }[];
    21.6- for testing add in text format under heading from GameCards.tsx
    21.7- {game.parent_platforms.map(({platform}) => <Text>{ platform.name }</Text> )}
    21.8- is time to render the icons after the test, for that let's use react-icons
    21.9- npm i react-icons@4.8.0 at the time of this project was created maybe is higher now
    21.10- to render the icon we need a mapping between the name of the platform and the icon, will be done in a different component
    21.11- in component folder, add file PlatformIconList.tsx
    21.12- create interface props
    21.13- interface Props {
                platforms: Platform[];
           }
    21.14- exported from useGames.ts
    21.15- export interface Platform
    21.16- on PlatformIconList.tsx
    21.17- import { Platform } from '../hooks/useGames';
    21.18- add the props to PlatformIconList
    21.19- const PlatformIconList = ({ platforms }: Props) => {
    21.20- on GameCard.tsx cut the text line added before
    21.21- {game.parent_platforms.map(({platform}) => <Text>{ platform.name }</Text> )}
    21.22- paste it on PlatformIconList.tsx as a return statement
    21.23- as we don't need anymore game.parent_platforms and don't need to destructure {platform}, will be end like this
    21.24- {platforms.map((platform) => <Text>{ platform.name }</Text> )}
    21.25- now on GameCard.tsx add after heading
    21.26- <PlatformIconList platforms={game.parent_platforms.map(p => p.platform)} /> 
    21.27- just for testing we were using labels now is time to change it for icons
    21.28- on PlatformIconList.tsx
    21.29- import the icon library from react-icons/fa
    21.30- import { 
                FaWindows, 
                FaPlaystation, 
                FaXbox, 
                FaApple, 
                FaLinux, 
                FaAndroid  
           } from 'react-icons/fa';
           import { MdPhoneIphone } from 'react-icons/md';
           import { SiNintendo } from 'react-icons/si';
           import { BsGlobe } from 'react-icons/bs';
    21.31- create an icon map with key index signature property
    21.32 - const iconMap: { [key: string]: IconType } = {
                pc: FaWindows,
                playstation: FaPlaystation,
                xbox: FaXbox,
                nintendo: SiNintendo,
                mac: FaApple,
                linux: FaLinux,
                android: FaAndroid,
                ios: MdPhoneIphone,
                web: BsGlobe
            }
    21.33- remove the text component and  put icon component
    21.34- to render the icon dynamically
    21.35-  return <HStack>
                        {platforms.map((platform) => (
                        <Icon as={iconMap[platform.slug]} color='gray.500'/>
                        ))}
                   </HStack>
    21.36-


    
