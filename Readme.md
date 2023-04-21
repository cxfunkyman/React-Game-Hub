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
    
    5.2- npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
    
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
    
    12.4- <HStack>
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
    
    14.6- <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
    
    14.7- before refresh go to inspect->application->local and delete chakra-ui-color-mode which is set to light
    
    14.8- now refresh

15- Build color mode switch

    15.1- in components create file ColorModeSwitch.tsx
    
    15.2- import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'
    
    15.3- const {toggleColorMode, colorMode} = useColorMode();
    
    15.4- <HStack>
            <Switch 
                colorScheme='green'
                isChecked={colorMode === 'dark'} 
                onChange={toggleColorMode}/>
            <Text>Dark Mode</Text>
          </HStack>
    
    15.5- now add to navbar.tsx
    
    15.6- import ColorModeSwitch from './ColorModeSwitch';
    
    15.7- <HStack>
            <Switch 
                colorScheme='green'
                isChecked={colorMode === 'dark'} 
                onChange={toggleColorMode}/>
            <Text>Dark Mode</Text>
          </HStack>

16- Install axios for HTTP request

    16.1- npm i axios
    
    16.2- let's create a custom service
    
    16.3- create folder services in scr folder
    
    16.4- create file api-client.ts
    
    16.5- import axios from "axios";
    
    16.6- axios.create({
            baseURL: 'Your URL goes here',
            params: {                
                key: 'Your api key goes here'
            }
           })

17- Fetching games form rawg api

    17.1- go to rawg.io login or sign up
    
    17.2- if still free ask for api key
    
    17.3- copy the api key and paste it on api-clients.ts
    
    17.4- go to rawg.io/apidocs click on read documentation on top of get API Key
    
    17.5- click on 'get /games' and copy the link
    
    17.6- inside components create file GameGrid.tsx
    
    17.7- const [games, setGames] = useState ([]);
    
    17.8- const [error, setError] = useState('');
    
    17.9- import apiClient from '../services/api-client';
    
    17.10- useEffect(() => {
            apiClient.get('games')
            .then(res => setGames())
           })
    
    17.11- use typescript to define an interface that represents the shape of the response object
    
    17.12- interface Game {
            id: number;
            name: string;
           }
           interface FetchGamesResponse {
            count: number;
            results: Game[];
           }
    
    17.13- const [games, setGames] = useState<Game[]> ([]);
    
    17.14- const [error, setError] = useState('');
    
    17.15- useEffect(() => {
            apiClient.get<FetchGamesResponse>('games')
            .then(res => setGames(res.data.results))
            .catch(err => setError(err.message));
           }, [])
    
    17.16- inside the return
           <>
              {error && <Text>{error}</Text>}
              <ul>
                {games.map(game => <li key={game.id}>{game.name}</li>)}
              </ul>
            </>
    
    17.17- in App.tsx on main GridItem add <GameGrid />

18- Create a custom hook for fetching
    
    18.1- inside scr create folder hooks
    
    18.2- inside hooks create file useGames.ts
    
    18.3- cut interfaces and useState, useEffect from GameGrid.tsx
        const [games, setGames] = useState<Game[]> ([]);
        const [error, setError] = useState('');
        useEffect(() => {
            apiClient
            .get<FetchGamesResponse>('games')
            .then(res => setGames(res.data.results))
            .catch(err => setError(err.message));
        }, []);
    
    18.4- put in useGames.ts
    
    18.5- in GameGrid.tsx add 
            const {games, error} = useGames();

19- Build game cards

    19.1- in components create file GameCard.tsx
    
    19.2- create a Props interface
    
    19.3- interface Props {
            game: Game;
          }
    
    19.4- return <Card>
                    <Image src={game.background_image}/>
                    <CardBody>
                        <Heading>{game.name}</Heading>
                    </CardBody>
                 </Card>
    
    19.5- on GameGrid.tsx replace the ul for SimpleGrid
    
    19.6- add the column and spacing size
    
    19.7- <SimpleGrid 
            columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} 
            spacing={10}>
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
    
    19.8- on GameCard.tsx add to Card 2 properties
    
    19.9- <Card borderRadius={10} overflow='hidden'>
    
    19.10- fix heading size with predefined size on chakra
    
    19.11- <Heading fontSize='1xl'>

20- Displaying icons

    
    20.1- add the parent platform property to each interface from the game json list on game interface from useGames.ts
    
    20.2- create a new interface
    
    20.3- interface Platform {
            id: number;
            name: string;
            slug: string;
          }
    
    20.4- add to game interface
    
    20.5- parent_platforms: { platform: Platform }[];
    
    20.6- for testing add in text format under heading from GameCards.tsx
    
    20.7- {game.parent_platforms.map(({platform}) => <Text>{ platform.name }</Text> )}
    
    20.8- is time to render the icons after the test, for that let's use react-icons
    
    20.9- npm i react-icons@4.8.0 at the time of this project was created maybe is higher now
    
    20.10- to render the icon we need a mapping between the name of the platform and the icon, will be done in a different component
    
    20.11- in component folder, add file PlatformIconList.tsx
    
    20.12- create interface props
    
    20.13- interface Props {
                platforms: Platform[];
           }
    
    20.14- exported from useGames.ts
    
    20.15- export interface Platform
    
    20.16- on PlatformIconList.tsx
    
    20.17- import { Platform } from '../hooks/useGames';
    
    20.18- add the props to PlatformIconList
    
    20.19- const PlatformIconList = ({ platforms }: Props) => {
    
    20.20- on GameCard.tsx cut the text line added before
    
    20.21- {game.parent_platforms.map(({platform}) => <Text>{ platform.name }</Text> )}
    
    20.22- paste it on PlatformIconList.tsx as a return statement
    
    20.23- as we don't need anymore game.parent_platforms and don't need to destructure {platform}, will be end like this
    
    20.24- {platforms.map((platform) => <Text>{ platform.name }</Text> )}
    
    20.25- now on GameCard.tsx add after heading
    
    20.26- <PlatformIconList platforms={game.parent_platforms.map(p => p.platform)} /> 
    
    20.27- just for testing we were using labels now is time to change it for icons
    
    20.28- on PlatformIconList.tsx
    
    20.29- import the icon library from react-icons/fa
    
    20.30- import { 
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
    
    20.31- create an icon map with key index signature property
    
    20.32 - const iconMap: { [key: string]: IconType } = {
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
    
    20.33- remove the text component and  put icon component
    
    20.34- to render the icon dynamically
    
    20.35- return <HStack marginTop={'10px'}>
                        {platforms.map((platform) => (
                        <Icon as={iconMap[platform.slug]} color='gray.500'/>
                        ))}
                   </HStack>

21- Display Critics Scores

    21.1- in useGames.ts add to game interface
    
    21.2- metacritic: number;
    
    21.3- on component folder create
    
    21.4- CriticScore.tsx
    
    21.5- create a new interface props with score: number and add it
    
    21.6- const CriticScore = ({ score }: Props)
    
    21.7- create badge from chakra and render the score
    
    21.8- <Badge>{ score }</Badge>
    
    21.9- on GameCard.tsx after PlatformIconList add
    
    21.10- <CriticScore score={game.metacritic}/>
    
    21.11- inside a horizontal stack HStack wrap PlatformIconList and CriticScore
    
    21.12- <HStack justifyContent='space-between'>
    
    21.13- add to badge font-size and border-radius
    
    21.14- fontSize='14px' paddingX={2} borderRadius='5px'
    
    21.15- create a constant to change the color of the badge
    
    21.16- let color = score >= 90 ? 'green' : score >= 80 ? 'yellow' : score < 80 ? 'red'  : '';
    
    21.17 add to badge 
    
    21.18- colorScheme={color}

22- Getting optimized images

    22.1- from this site rawg.io were the api link is taken images are to big to show inside cards, but this api support cropping images on the fly for example one image url is: https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg but if we add to this link crop/600/400 we'll get a small image
    https://media.rawg.io/media/crop/600/400/games/562/562553814dd54e001a541e4ee83a591c.jpg
    
    22.2- create a new service to modify the url
    
    22.2- on services folder create file
    
    22.3- image-url.ts
    
    22.4- create const getCroppedImageUrl
    
    22.5- create a target to store 'media/
    
    22.6- create index to store
        
        22.6.1- url.indexOf(target) + target.length;
    
    22.7- return a url.slice
        
        22.7.1- slice frm the beginning to index (0, index), then add the crop accepted by the api in this case 'crop/600/400/', then add the rest of the url
        
        22.7.2- return url.slice(0, index) + 'crop/600/400' + url.slice(index);
    
    22.8- on GameCard.tsx in Image src call the getCroppedImageUrl and pass the game.background_image as a parameter
        
        22.8.1- <Image src={getCroppedImageUrl(game.background_image)}/>

23- Improving User Experience with Loading Skeletons

    23.1- on useGames.ts add 
        23.1.1- const [isLoading, setIsLoading] = useState(false);
    
    23.2- in the useEffect in the response add new statement before the apiClient setIsLoading to true and in .then and .catch to false
        
        23.2.1- setIsLoading(true);
                apiClient
        
        23.2.2- .then(res => {
                    setGames(res.data.results);
                    setIsLoading(false);
                })
    
    23.3- the same in the catch
        
        23.3.1- .catch(err => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setIsLoading(false);
                });
    
    23.4- and in the return add isLoading
        
        23.4.1- return { games, error, isLoading };
    
    23.5- in components folder create file GameCardSkeleton.tsx
    
    23.6- in the return statement create a card inside a skeleton with height 200px for test, then create card body inside skeleton text
        
        23.6.1- <Card width='300px' borderRadius={15} overflow='hidden'>
                    <Skeleton height='200px' />
                    <CardBody>
                        <SkeletonText />
                    </CardBody>
                </Card>
    
    23.7- now add to GameGrid.tsx
        
        23.7.1- const {games, error, isLoading} = useGames();
        
        23.7.2- create an Array
            
            23.7.3- const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    23.8- add a new line to render the skeletons when the page is loading
        
        23.8.1- {isLoading && skeletons.map(skeleton => <GameCardSkeleton key={skeleton}/>)}

24- Refactor - Removing Duplicated Styles

    24.1- on components folder create new file
        
        24.1.1- GameCardContainer.tsx
    
    24.2- return <Box></Box>
    
    24.3- apply style to box
        
        24.3.1- <Box width='300px' borderRadius={15}      overflow='hidden'></Box>
    
    24.4- create interface props with children reactnode
        
        24.4.1- interface Props {
                    children: ReactNode
                } 
    
    24.5- add to GameCardContainer
        
        24.5.1- const GameCardContainer = ({ children }: Props) => {
    
    24.6- add to Box children
        
        24.6.1- { children }  
    
    24.7- add to GameGrid.tsx wrap the gamecardskeleton component and gamecard component
        
        24.7.1- <GameCardContainer>
                    <GameCardSkeleton key={skeleton} />
                </GameCardContainer>)}
        
        24.7.2- <GameCardContainer>
                    <GameCard key={game.id} game={game} />
                </GameCardContainer>

25- Fetching the Genres

    25.1- on components create GenreList.tsx
    
    25.2- on hooks create useGenre.ts
    
    25.3- because is the same return as useGame.ts you can either copy and modify or start from zero.
    
    25.4- as in usGame.ts create 2 interfaces the same
        
        25.4.1- interface Genre {
                    id: number;
                    name: string;
                    slug: string;
                }
        
        25.4.2- interface FetchGenresResponse {
                    count: number;
                    results: Genre[];
                }
    
    25.5- on GenreList.tsx add const genre
        
        25.5.1- const {genres} = useGenres();
    
    25.6- return a ul with the mapping of genres
        
        25.6.1- {genres.map(genre => <li key={genre.id}>    {genre.name}</li>)}
    
    25.7- add GenreList component to app component to the aside area
        
        25.8- <GridItem area='aside'>
                    <GenreList />
              </GridItem>

26- Creating a Generic Data Fetching Hook

    26.1- in hooks folder create a new file
        
        26.1.1- useData.ts
    
    26.2- copy all the code inside useGenres.ts and paste it in the new file
    
    26.3- delete Genre interface
    
    26.4- change [genre, setGenre] to [data, setData]
    
    26.5- instead of Genre us a generic type <T>
        
        26.5.1- const useData = <T>() => {
                const [data, setData] = useState<T[]> ([]);
    
    26.6- add generic type to fetchGenreResponse and change name to fetchResponse
        
        26.6.1- interface FetchResponse<T> {
                    count: number;
                    results: T[];
                }
    
    26.7- add endpoint as a parameter
        
        26.7.1- const useData = <T>(endpoint: string) => {
    
    26.8- add to .get fetchGenres
        
        26.8.1- .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
    
    26.9- last return data error and isLoading
    
    26.10- in GenreList.tsx change genre for data and add
        
        26.10.1- const { data } = useData<Genre>('genres');
    
    26.11- in useGenre.ts delete the fetchGenreResponse interface and delete the body of useGenres instead add
        
        26.11.1- const useGenres =() => useData<Genre>('genres');
    
    26.12- as the GameList.tsx don't have to know about the endpoint after step 26.11.1 in this file add
        
        26.12.1- const { data } = useGenres();    
    
    26.13- same process for fetching games, and in the GameGrid.tsx fix the error for games change it for data

27- Displaying the Genres

    27.1- in useGenre.ts add background_image to interface
        
        27.1.1- background_image: string;
    
    27.2- on GenreList.ts change the ul for List and the li for ListItem, both from chakra
    
    27.3- remove the genre.name, and add an horizontal stack to renders the name and the icons horizontally, for image fetch use the getcroppedimageurl
        
        27.3.1- <ListItem key={genre.id}      paddingY="5px">
                    <HStack>
                        <Image
                            boxSize="32px"
                            borderRadius={10}
                            src={getCroppedImageUrl(genre.image_background)}
                        />
                        <Text>{genre.name}</Text>
                    </HStack>
                </ListItem>
    
    27.4- in the App.tsx add horizontal padding to aside area
        
        27.4.1- <GridItem area='aside' paddingX={5}>
    
    27.5- remove the fix card width of 300px

28- Showing a Spinner

    28.1- on GameList.tsx add const isLoading and error
    
    28.2- add if statement to check if is loading is true show spinner and if error is tru return null
        
        28.2.1- const { data, isLoading, error } = useGenres();
                if (isLoading) return <Spinner />;
                if (error) return null;

29- Filtering Games by Genre

    29.1- on GenreList.tsx change the Text for a button
    
    29.2- in App.tsx create a state hook for the genre filtering
        
        29.2.1- const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    
    29.3- on GenreList.tsx add a prop for passing a callback function
        
        29.3.1- interface Props {
                    onSelectGenre: (genre: Genre) => void;
                }
        
        29.3.2- add the parameter
            
            29.3.2.1- GenreList = ({ onSelectGenre }: Props)
        
        29.3.3- add event to button
            
            29.3.3.1- onClick={() => onSelectGenre(genre)}
    
    29.4- in App.tsx aside area add the new props
        
        29.4.1- <GenreList onSelectGenre={(genre) => setSelectedGenre(genre)} />
    
    29.5- on GameGrid.tsx add a new props interface
        
        29.5.1- interface Props {
                    onSelectGenre: (genre: Genre) => void;
                }
        
        29.5.2- add the props parameter
    
    29.6- on GameGrid add the selectedGenre to useGames
        
        29.6.1- const { data, error, isLoading } = useGames(selectedGenre);
    
    29.7- now we have to modify useGames.ts to accept the parameter
        
        29.7.1- const { data, error, isLoading } = useGames(selectedGenre);
        
        29.7.2- on useData.ts modify const useData and add a second parameter optional requestConfig? type AxiosRequestConfig
            
            29.7.3- (endpoint: string, requestConfig?: AxiosRequestConfig)
        
        29.8- on useGames.ts add from AxiosRequestConfig params
            
            29.8.1- const useGames = (selectedGenre: Genre | null) => useData<Game>('games', { params: { genres: selectedGenre?.id} })
        
        29.9- now on useData.ts on fetchResponse after signal spread the requestConfig object
            
            29.9.1- (endpoint, { signal: controller.signal, ...requestConfig })
        
        29.10- let's test and se on network that we're a not sending any request to the server because we set empty array to the useEffect, making it to request only once to the server, we need to pass new dependencies.
            
            29.10.1 return () => controller.abort();
                    }, []);
        
        29.11- in the parameters after requestConfig add deps:
        with an any array
            
            29.11.1- deps?: any[]
        
        29.12- now add the dependency to the use effect return, might have an error because the deps might be null or undefined so we must set a ternary if
            
            29.12.1- return () => controller.abort();
                    }, deps ? [...deps] : []);
        
        29.13- on useGames.ts after params add the dependency
            
            29.13.1- { params: { genres: selectedGenre?.      id} }, [selectedGenre?.id]);
        
        29.14- back to App.tsx and pass the selected genre to our GameGrid
            
            29.14.1- <GameGrid selectedGenre={selectedGenre}/>

30- Highlighting the Selected Genre

    30.1- on GenreList.tsx add a new props selectedGenre type Genre or null
        
        30.1.1- selectedGenre: Genre | null;
    
    30.2- add to GenreList parameters
    
    30.3- in App.tsx add the parameter to GenreList

31- Building Platform Selector (build a platform dropdown list)

    31.1- on components folder add new file PlatformSelector.tsx
    
    31.2- add from chakra menu and menubutton righticon from bootstrap chevron down, add a menulist and many menuitem just to test our app
        
        31.2.1- <Menu>
                    <MenuButton as={Button} rightIcon=  {<BsChevronDown />}>
                        Platforms
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Item 1</MenuItem>        
                        <MenuItem>Item 2</MenuItem>        
                        <MenuItem>Item 3</MenuItem>        
                    </MenuList>
                </Menu>
        
        31.3- add the platform selector on top of gamegrid in the app component main area
        
        31.4- let's render the menuitem dynamically, for that we'll need a different endpoint from rawg.io
        
        31.5- for platforms Rawg.io have 3 different endpoint
            
            1- Get a list of video game platforms
            2- Get a list of parent platforms
            3- Get details of the platform
        
        31.6- option number 2 will be used
            
            31.6.1- https://api.rawg.io/api/platforms/lists/parents
        
        31.7- in hooks folder create a new hook usePlatforms.ts
        
        31.8 the same as the other hooks but with platforms
            
            31.8.1- const usePlatforms = () => useData<Platform>('platforms/lists/parents');
        
        31.9- add error to usePlatforms
            
            31.9.1- const { data, error } = usePlatforms();
        
        31.10- add if statement in case of an error before return statement
            
            31.10.1- if (error) return null;
        
        31.11- render dynamically the MenuItem
            
            31.11.1- {data.map(platform => <MenuItem key={platform.id}>{platform.name}</MenuItem>)}

32- Filtering Games by Platform

    32.1- using the same approach as before (filtering by genre)
    
    32.2- in app component add new useState, the same as genre but for platforms
        
        32.2.1- const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    
    32.3- on PlatformSelector.tsx add an interface prop
        
        32.3.1- interface Props{
                    onSelectPlatform: (platform: Platform) => void;
                }
    
    32.4- add parameter to PlatformSelector
        
        32.4.1- PlatformSelector = ({ onSelectPlatform }: Props)
    
    32.5- to MenuItem add the onSelectPlatform
        
        32.5.1- {data.map(platform => <MenuItem onClick={() => onSelectPlatform(platform)} key={platform.id}>{platform.name}</MenuItem>)}
    
    32.6- in GameGrid component interface props add selectedPlatform type Platform or null
        
        32.6.1- selectedPlatform: Platform | null;
    
    32.7- app component on GameGrid main are add the selectedPlatform
        
        32.7.1- <GameGrid selectedPlatform={selectedPlatform} selectedGenre={selectedGenre}/>
    
    32.8- the rest is the same process as genre filtering

33- Refactoring- Extracting a Query Object

    33.1- till now we have too many variables and in the future we'll need some more like sort selector variables, searching an so on.
    To fix that we'll pack related variables inside an object with the Query Object Pattern, that contains all the query we need to query the games, making the code cleaner and easy to understand
    
    33.2- in the app component create an interface GameQuery, 2 parameters, one for genre type Genre or null, the other platform type Platform or null.
        
        33.2.1- interface GameQuery {
                    genre: Genre | null;
                    platform: Platform | null;
                }
    
    33.3- delete the 2 useState for genre and platform and create a new useState with GameQuery interface
        
        33.3.1- interface GameQuery {
                    genre: Genre | null;
                    platform: Platform | null;
                }
        
        33.3.2- const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
    
    33.4- now replace selectedGenre and selectedPlatform with gameQuery.genre and gameQuery.platform
    
    33.5- replace setSelectedGenre and setSelectedPlatform with setGameQuery({ ...gameQuery ,genre }) and setGameQuery({ ...gameQuery ,platform })
    
    33.5- now the same in the GameGrid component
        
        33.5.1- add gameQuery: GameQuery to props and delete the rest of the parameters
        
        33.5.2- replace selectedGenre and selectedPlatform with gameQuery
        
        33.5.3- now in useGames replace all the parameters with gameQuery
        
        33.5.4- now modify useGames.ts to accept the parameter
        
        33.5.5- add gameQuery to interface Props and delete the other 2, replace selectedGenre and selectedPlatform with gameQuery.genre and gameQuery.platform.
        
        33.5.6- for the dependencies, only need to pass gameQuery
        
        33.5.7- in the app component on main area GameGrid delete the passing objects and replace the with gameQuery={gameQuery}

34- Building Sort Selector

    34.1- on component folder create a new file
        
        34.1.1- SortSelector.tsx
    
    34.2- as SortSelector component is like PlatformSelector component we can copy the return statement and paste it inside the return of SortSelector component
    
    34.3- add 6 menu item
        
        34.3.1- <MenuItem>Relevance</MenuItem>
                <MenuItem>Date Added</MenuItem>
                <MenuItem>Name</MenuItem>
                <MenuItem>Release Date</MenuItem>
                <MenuItem>Popularity</MenuItem>
                <MenuItem>Average Rating</MenuItem>
    
    34.4- add SortSelector component to app component after PlatformSelector
        
        34.4.1- put SortSelector and PlatformSelector inside an horizontal stack HStack

35- Sorting Games

    35.1- sort games use the same approach as filtering, the Rawg.io api gives a set of keywords for sorting(ordering):
        
        1- name
        2- released
        3- added
        4- created
        5- updated
        6- rating
        7- metacritic
    
    35.2-  first lest create an array with values for rendering automatically the menuItem
        
        35.2.1- const sortOrders = [
                    { value: '', label: 'Relevance' },
                    { value: '-added', label: 'Date Added' },
                    { value: 'name', label: 'Name' },
                    { value: '-released', label: 'Released Date' },
                    { value: '-metecritic', label: 'Popularity' },
                    { value: '-rating', label: 'Average Rating' },
                    { value: '-created', label: 'Created' },
                    { value: '-updated', label: 'Updated' },
                ];
    
    35.3- render the MenuItem dynamically
        
        35.3.1- <MenuList>
                    {sortOrders.map((order) => (
                    <MenuItem 
                        key={order.id} 
                        value={order.value}
                    >
                        {order.label}
                    </MenuItem>
                    ))}
                </MenuList>
    
    35.4- create interface props with select sort order, parameter sort order as string and return void
        
        35.4.1- interface Props {
                    onSelectSortOrder: (sortOrder: string) => void;
                }
    
    35.5- add props to SortSelector and implement onClick
        
        35.5.1- onClick={() => onSelectSortOrder(order.value)}
    
    35.6- in app component add sortOrder type string to GameQuery interface
    
    35.7- to SortSelector add the onSelectSortOrder event, this will make the app component to re-render
        
        35.8- onSelectSortOrder={(sortOrder) =>
              setGameQuery({ ...gameQuery, sortOrder })
              }
    
    35.8- in the next render we'll pass the new game query object to GameGrid, go useGames hook and add to params 
        
        35.8.1- ordering: gameQuery.sortOrder
        
        35.8.2- return to app component and in GameGrid add gameQuery and pass gameQuery as an object
    
    35.9- till now we'll have an issue with games with no image this will create the app to crash, so in image_url.ts on service folder add an if statement where if !url return an empty string
    
    35.10.- now in the app component on SortSelector add sort order with gameQuery.sortOrder, to pass the name dynamically of the selected category 
        
        35.10.1- sortOrder={gameQuery.sortOrder}
    
    35.11- add the sortOrder type string prop to SortSelector
    
    35.12- create a new const to render the name of the selected filter
        
        35.12.1- const currentSortOrder = sortOrders.find(order => order.value === sortOrder);
    
    35.13- add next to order by the current sort order
        
        35.13.1- Order by: {currentSortOrder?.label || 'Relevance'}

36- Handling Games without an Image
    
    36.1- using an image to replace the image card when are not available, take one of your choice an put it inside assets folder
    
    36.2- go to image-url.ts and import the image from assets
        
        36.2.1- import noImage from '../assets/NAME OF YOUR IMAGE';
    
    36.3- now in the if statement done before to prevent crashes for cards with no image, instead or returning an empty string return noImage
        
        36.3.1- if (!url) return noImage;

37- Fixing the Issue with Chakra Menus
    
    37.1- it seems we have a CSS issue noted in the console every time we make a filtering
    
    37.2- to fix it replace HStack for Flex, but as Flex doesn't handle spacing we'll have to delete it
    
    37.3- to fix this issue wrap one of the components inside a Box and give a marginRight or marginLeft depends on which one you selected and give a value of 5 
        
        37.3.1- <Box marginRight={5}>
                    <PlatformSelector
                        selectedPlatform={gameQuery.platform}
                        onSelectPlatform={(platform) =>
                        setGameQuery({ ...gameQuery, platform })
                        }
                    />
                </Box>

38- Building Search Input

    38.1- in component folder create a new file SearchInput.tsx
    
    38.2- create an input
        
        38.2.1- <Input borderRadius={25} placeholder='Search games...' variant='filled/>
    
    38.3- in NavBar component add it to nav area after logo
        
        38.3.1- <SearchInput />
    
    38.4- probably the dark mode label will be wrapped to fix that go to ColorModeSwitch component and add to the field Text a standard css attribute whiteSpace='nowrap'
        
        38.4.1- <Text whiteSpace='nowrap'>
    
    38.5- on SearchInput component wrap the input inside an InputGroup and inside add InputLeftElement with children for bootstrap search icon
        
        38.5.1- <InputGroup>
                    <InputLeftElement children={<BsSearch />} />
                    <Input borderRadius={25} placeholder="Search games..." variant="filled" />
                </InputGroup>

39- Searching Games

    39.1- in SearchInput component wrap everything inside a Form element.
    note: select all the fields and bring the command pallet type wrap and then form.        

    39.2- replace action for onSubmit and prevent default

        39.2.1- <form onSubmit={(event) => {
                    event.preventDefault();
                }}>
                    <InputGroup>
                        <InputLeftElement children={<BsSearch />} />
                        <Input borderRadius={25} placeholder="Search games..." variant="filled" />
                    </InputGroup>
                </form>

    39.3- now we can either use a ref hook or state hook, but because we have a simple input is easier to use a ref hook.
    
    39.4- before the return statement add the useRef and add it to the input element
        
        39.4.1- const ref = useRef<HTMLInputElement>(null);

        39.4.2- <Input ref={ref} borderRadius={25} placeholder="Search games..." variant="filled" />

    39.5- now inside form after event.preventdefault check if the ref is true (log into console to test if is working)

        39.5.1- for test: if (ref.current) console.log(ref.current.value); 

    39.6- probably the size of the form is shorter to fixed go to index.css and make the form width 100%

        36.6.1- form {
                    width: 100%;
                }

    39.7- continuing with SearchInput component add a props interface with parameters onSearch with searchText type string returning void and add the props to SearchInput

        39.7.1- interface Props {
                    onSearch: (searchText: string) => void;
                }

    39.8- replace the console log for onSearch

        39.8.1- for test: if (ref.current) onSearch(ref.current.value); 

    39.9- now in app component add search text type string to the GameQuery interface.

    39.10- in the NavBar component inside SearchInput element add onSearch

        39.10.1- <SearchInput onSearch={onSearch}/>

    39.11- for now export the props from SearchInput and add it to the const NavBar as parameters

        39.11.1- const NavBar = ({ onSearch }: Props)
    
    39.12- in the app component add it to nav bar in the nav area

        39.12.1- <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText})} />

    39.13- now on useGames hooks add to params

        39.13.1- search: gameQuery.searchText

40- Adding a Dynamic Heading

    40.1- on components folder create file GameHeading.tsx

    40.2- we'll be returning a chakra Heading, you can return a react <H1> but we'll stick to chakra components

        40.2.1- <Heading as='h1'></Heading>

    40.3- now to render the heading dynamically we should receive the game query object as a props in this component, define props gameQuery of type GameQuery and add the parameters

        40.3.1- interface Props {
                    gameQuery: GameQuery
                }

        40.3.2- const GameHeading = ({ gameQuery }: Props) => {

    40.4- before return statement create a heading const and add gameQuery platform and genre name, at the end Games

        40.4.1- const heading = `${gameQuery.platform?.name || ''} ${gameQuery.genre?.name || ''} Games`;

    40.5- now add it to Heading

        40.5.1- <Heading as="h1">{heading}</Heading>

    40.6- now in the app component and add our game heading just before main area flex component

        40.6.1- <GridItem area="main">
                    <GameHeading gameQuery={gameQuery}/>
                    <Flex paddingLeft={4} marginBottom={2}>

    40.7- in the app component wrap the heading, platform filter, order by, and game cards into a chakra box component

        40.7.1- <Box paddingLeft={4}>
                    <GameHeading gameQuery={gameQuery} />
                    <Flex marginBottom={2}>
                        <Box marginRight={5}>
                            <PlatformSelector
                                selectedPlatform={gameQuery.platform}
                                onSelectPlatform={(platform) =>
                                setGameQuery({ ...gameQuery, platform })
                                }
                            />
                        </Box>
                        <SortSelector
                            sortOrder={gameQuery.sortOrder}
                            onSelectSortOrder={(sortOrder) =>
                            setGameQuery({ ...gameQuery, sortOrder })
                        }
                        />
                    </Flex>
                </Box>

41