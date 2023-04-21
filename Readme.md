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
    21.35- return <HStack marginTop={'10px'}>
                        {platforms.map((platform) => (
                        <Icon as={iconMap[platform.slug]} color='gray.500'/>
                        ))}
                   </HStack>

22- Display Critics Scores

    22.1- in useGames.ts add to game interface
    22.2- metacritic: number;
    22.3- on component folder create
    22.4- CriticScore.tsx
    22.5- create a new interface props with score: number and add it
    22.6- const CriticScore = ({ score }: Props)
    22.7- create badge from chakra and render the score
    22.8- <Badge>{ score }</Badge>
    22.9- on GameCard.tsx after PlatformIconList add
    22.10- <CriticScore score={game.metacritic}/>
    22.11- inside a horizontal stack HStack wrap PlatformIconList and CriticScore
    22.12- <HStack justifyContent='space-between'>
    22.13- add to badge font-size and boreder-radius
    22.14- fontSize='14px' paddingX={2} borderRadius='5px'
    22.15- create a constant to change the color of the badge
    22.16- let color = score >= 90 ? 'green' : score >= 80 ? 'yellow' : score < 80 ? 'red'  : '';
    22.17 add to badge 
    22.18- colorScheme={color}

23- Getting optimized images

    23.1- from this site rawg.io were the api link is taken images are to big to show inside cards, but this api support cropping images on the fly for example one image url is: https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg but if we add to this link crop/600/400 we'll get a small image
    https://media.rawg.io/media/crop/600/400/games/562/562553814dd54e001a541e4ee83a591c.jpg
    23.2- create a new service to modify the url
    23.2- on services folder create file
    23.3- image-url.ts
    23.4- create const getCroppedImageUrl
    23.5- create a target to store 'media/
    23.6- create index to store
        23.6.1- url.indexOf(target) + target.length;
    23.7- return a url.slice
        23.7.1- slice frm the beginning to index (0, index), then add the crop acepted by the api in this case 'crop/600/400/', then add the rest of the url
        23.7.2- return url.slice(0, index) + 'crop/600/400' + url.slice(index);
    23.8- on GameCard.tsx in Image src call the getCroppedImageUrl and pass the game.background_image as a parameter
        23.8.1- <Image src={getCroppedImageUrl(game.background_image)}/>

24- Improving User Experience with Loading Skeletons

    24.1- on useGames.ts add 
        24.1.1- const [isLoading, setIsLoading] = useState(false);
    24.2- in the useEffect in the response add new statement before the apiClinet setIsLoading to true and in .then and .catch to false
        24.2.1- setIsLoading(true);
                apiClient
        24.2.2- .then(res => {
                    setGames(res.data.results);
                    setIsLoading(false);
                })
    24.3- the same in the catch
        24.3.1- .catch(err => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setIsLoading(false);
                });
    24.4- and in the return add isLoading
        24.4.1- return { games, error, isLoading };
    24.5- in components folder create file GameCardSkeleton.tsx
    24.6- in the return statement create a card inside a skeleton with height 200px for test, then create card body inside skeleton text
        24.6.1- <Card width='300px' borderRadius={15} overflow='hidden'>
                    <Skeleton height='200px' />
                    <CardBody>
                        <SkeletonText />
                    </CardBody>
                </Card>
    24.7- now add to GameGrid.tsx
        24.7.1- const {games, error, isLoading} = useGames();
        24.7.2- create an Array
            24.7.3- const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    24.8- add a new line to render the skeletons when the page is loading
        24.8.1- {isLoading && skeletons.map(skeleton => <GameCardSkeleton key={skeleton}/>)}

25- Refactor - Removing Duplicated Styles

    25.1- on components folder create new file
        25.1.1- GameCardContainer.tsx
    25.2- return <Box></Box>
    25.3- apply style to box
        25.3.1- <Box width='300px' borderRadius={15}      overflow='hidden'></Box>
    25.4- create interface props with children reactnode
        25.4.1- interface Props {
                    children: ReactNode
                } 
    25.5- add to GameCardContainer
        25.5.1- const GameCardContainer = ({ children }: Props) => {
    25.6- add to Box children
        25.6.1- { children }  
    25.7- add to GameGrid.tsx wrap the gamecardskeleton component and gamecard component
        25.7.1- <GameCardContainer>
                    <GameCardSkeleton key={skeleton} />
                </GameCardContainer>)}
        25.7.2- <GameCardContainer>
                    <GameCard key={game.id} game={game} />
                </GameCardContainer>

26- Fetching the Genres

    26.1- on components create GenreList.tsx
    26.2- on hooks create useGenre.ts
    26.3- because is the same return as useGame.ts you can either copy and modify or start from zero.
    26.4- as in usGame.ts create 2 interfaces the same
        26.4.1- interface Genre {
                    id: number;
                    name: string;
                    slug: string;
                }
        26.4.2- interface FetchGenresResponse {
                    count: number;
                    results: Genre[];
                }
    26.5- on GenreList.tsx add const genre
        26.5.1- const {genres} = useGenres();
    26.6- return a ul with the mapping of genres
        26.6.1- {genres.map(genre => <li key={genre.id}>    {genre.name}</li>)}
    26.7- add GenreList component to app component to the aside area
        26.8- <GridItem area='aside'>
                    <GenreList />
              </GridItem>

27- Creating a Generic Data Fetching Hook

    27.1- in hooks folder create a new file
        27.1.1- useData.ts
    27.2- copy all the code inside useGenres.ts and paste it in the new file
    27.3- delete Genre interface
    27.4- change [genre, setGenre] to [data, setData]
    27.5- instead of Genre us a gereic type <T>
        27.5.1- const useData = <T>() => {
                const [data, setData] = useState<T[]> ([]);
    27.6- add generic type to fetchGenreResponse and change name to fetchResponse
        27.6.1- interface FetchResponse<T> {
                    count: number;
                    results: T[];
                }
    27.7- add endpoint as a parameter
        27.7.1- const useData = <T>(endpoint: string) => {
    27.8- add to .get fetchGenres
        27.8.1- .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
    27.9- last return data error and isLoading
    27.10- in GenreList.tsx change genre for data and add
        27.10.1- const { data } = useData<Genre>('genres');
    27.11- in useGenre.ts delete the fetchGenreResponse interface and delete the body of useGenres instead add
        27.11.1- const useGenres =() => useData<Genre>('genres');
    27.12- as the GameList.tsx don't have to know about the endpoint after step 27.11.1 in this file add
        27.12.1- const { data } = useGenres();    
    27.13- same process for fetching games, and in the GameGrid.tsx fix the error for games change it for data

28- Displaying the Genres

    28.1- in useGenre.ts add background_image to interface
        28.1.1- background_image: string;
    28.2- on GenreList.ts change the ul for List and the li for ListItem, both from chakra
    28.3- remove the genre.name, and add an horizontal stack to renders the name and the icons horizontally, for image fetch use the getcroppedimageurl
        28.3.1- <ListItem key={genre.id}      paddingY="5px">
                    <HStack>
                        <Image
                            boxSize="32px"
                            borderRadius={10}
                            src={getCroppedImageUrl(genre.image_background)}
                        />
                        <Text>{genre.name}</Text>
                    </HStack>
                </ListItem>
    28.4- in the App.tsx add horizontal padding to aside area
        28.4.1- <GridItem area='aside' paddingX={5}>
    28.5- remove the fix card width of 300px

29- Showing a Spinner

    29.1- on GameList.tsx add const isLoading and error
    29.2- add if statement to check if is loading is true show spinner and if error is tru return null
        29.2.1- const { data, isLoading, error } = useGenres();
                if (isLoading) return <Spinner />;
                if (error) return null;

30- Filtering Games by Genre

    30.1- on GenreList.tsx change the Text for a button
    30.2- in App.tsx create a state hook for the genre filtering
        30.2.1- const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    30.3- on GenreList.tsx add a prop for passing a callback function
        30.3.1- interface Props {
                    onSelectGenre: (genre: Genre) => void;
                }
        30.3.2- add the parameter
            30.3.2.1- GenreList = ({ onSelectGenre }: Props)
        30.3.3- add event to botton
            30.3.3.1- onClick={() => onSelectGenre(genre)}
    30.4- in App.tsx aside area add the new props
        30.4.1- <GenreList onSelectGenre={(genre) => setSelectedGenre(genre)} />
    30.5- on GameGrid.tsx add a new props interface
        30.5.1- interface Props {
                    onSelectGenre: (genre: Genre) => void;
                }
        30.5.2- add the props parameter
    30.6- on GameGrid add the selectedGenre to useGames
        30.6.1- const { data, error, isLoading } = useGames(selectedGenre);
    30.7- now we have to modify useGames.ts to accept the parameter
        30.7.1- const { data, error, isLoading } = useGames(selectedGenre);
        30.7.2- on useData.ts modify const useData and add a second parameter optional requestConfig? type AxiosRequestConfig
            30.7.3- (endpoint: string, requestConfig?: AxiosRequestConfig)
        30.8- on useGames.ts add from AxiosRequestConfig params
            30.8.1- const useGames = (selectedGenre: Genre | null) => useData<Game>('games', { params: { genres: selectedGenre?.id} })
        30.9- now on useData.ts on fetchResponse after signal spread the requestConfig object
            30.9.1- (endpoint, { signal: controller.signal, ...requestConfig })
        30.10- let's test and se on network that we're a not sending any request to the server because we set empty array to the useEffect, making it to request only once to the server, we need to pass new dependencies.
            30.10.1 return () => controller.abort();
                    }, []);
        30.11- in the parameters after requestConfig add deps:
        with an any array
            30.11.1- deps?: any[]
        30.12- now add the dependency to the use effect return, might have an error because the deps might be null or undefined so we must set a ternary if
            30.12.1- return () => controller.abort();
                    }, deps ? [...deps] : []);
        30.13- on useGames.ts after params add the dependency
            30.13.1- { params: { genres: selectedGenre?.      id} }, [selectedGenre?.id]);
        30.14- back to App.tsx and pass the selected genre to our GameGrid
            30.14.1- <GameGrid selectedGenre={selectedGenre}/>

31- Highlighting the Selected Genre

    31.1- on GenreList.tsx add a new props selectedGenre type Genre or null
        31.1.1- selectedGenre: Genre | null;
    31.2- add to GenreList parameters
    31.3- in App.tsx add the parameter to GenreList

32- Building Platform Selector (build a platform dropdown list)

    32.1- on components folder add new file PlatformSelector.tsx
    32.2- add from chakra menu and menubutton righticon from bootstrap chevron down, add a menulist and many menuitem just to test our app
        32.2.1- <Menu>
                    <MenuButton as={Button} rightIcon=  {<BsChevronDown />}>
                        Platforms
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Item 1</MenuItem>        
                        <MenuItem>Item 2</MenuItem>        
                        <MenuItem>Item 3</MenuItem>        
                    </MenuList>
                </Menu>
        32.3- add the platform selector on top of gamegrid in the app component main area
        32.4- let's render the menuitem dynamically, for that we'll need a different endpoint from rawg.io
        32.5- for platforms Rawg.io have 3 different endpoint
            1- Get a list of video game platforms
            2- Get a list of parent platforms
            3- Get details of the platform
        32.6- option number 2 will be used
            32.6.1- https://api.rawg.io/api/platforms/lists/parents
        32.7- in hooks folder create a new hook usePlatforms.ts
        32.8 the same as the other hooks but with platforms
            32.8.1- const usePlatforms = () => useData<Platform>('platforms/lists/parents');
        32.9- add error to usePlatforms
            32.9.1- const { data, error } = usePlatforms();
        32.10- add if statement in case of an error before return statement
            32.10.1- if (error) return null;
        32.11- render dynamically the MenuItem
            32.11.1- {data.map(platform => <MenuItem key={platform.id}>{platform.name}</MenuItem>)}

33- Filtering Games by Platform

    33.1- using the same approach as before (filtering by genre)
    33.2- in app component add new useState, the same as genre but for platforms
        33.2.1- const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    33.3- on PlatformSelector.tsx add an interface prop
        33.3.1- interface Props{
                    onSelectPlatform: (platform: Platform) => void;
                }
    33.4- add parameter to PlatformSelector
        33.4.1- PlatformSelector = ({ onSelectPlatform }: Props)
    33.5- to MenuItem add the onSelectPlatform
        33.5.1- {data.map(platform => <MenuItem onClick={() => onSelectPlatform(platform)} key={platform.id}>{platform.name}</MenuItem>)}
    33.6- in GameGrid component interface props add selectedPlatform type Platform or null
        33.6.1- selectedPlatform: Platform | null;
    33.7- app component on GameGrid main are add the selectdPlatform
        33.7.1- <GameGrid selectedPlatform={selectedPlatform} selectedGenre={selectedGenre}/>
    33.8- the rest is the same process as genre filtering

34- Refactoring- Extracting a Query Object

    34.1- till now we have too many variables and in the future we'll need some more like sort selector variables, searching an so on, to fix that we'll pack related variables inside an object with the Query Object Pattern, that contains all the query we need to query the games, making the code cleaner and easy to understand
    34.2- in the app component create an interface GameQuery, 2 parameters, one for genre type Genre or null, the other platform type Platform or null.
        34.2.1- interface GameQuery {
                    genre: Genre | null;
                    platform: Platform | null;
                }
    34.3- delete the 2 useState for genre and platform and create a new useState with GameQuery interface
        34.3.1- interface GameQuery {
                    genre: Genre | null;
                    platform: Platform | null;
                }
        34.3.2- const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
    34.4- now replace selectedGenre and selectedPlatform with gameQuery.genre and gameQuery.platform
    34.5- replace setSelectedGenre and setSelectedPlatform with setGameQuery({ ...gameQuery ,genre }) and setGameQuery({ ...gameQuery ,platform })
    34.5- now the same in the GameGrid component
        34.5.1- add gameQuery: GameQuery to props and delete the rest of the parameters
        34.5.2- replace selectedGenre and selectedPlatform with gameQuery
        34.5.3- now in useGames replace all the parameters with gameQuery
        34.5.4- now modify useGames.ts to accept the parameter
        34.5.5- add gameQuery to interface Props and delete the other 2, replace selectedGenre and selectedPlatform with gameQuery.genre and gameQuery.platform.
        34.5.6- for the dependencies, only need to pass gameQuery
        34.5.7- in the app component on main area GameGrid delete the passing objects and replace the with gameQuery={gameQuery}

35- Building Sort Selector

    35.1- on component folder create a new file
        35.1.1- SortSelector.tsx
    35.2- as SortSelector component is like PlatformSelector component we can copy the return statement and paste it inside the return of SortSelector component
    35.3- add 6 menu item
        35.3.1- <MenuItem>Relevance</MenuItem>
                <MenuItem>Date Added</MenuItem>
                <MenuItem>Name</MenuItem>
                <MenuItem>Release Date</MenuItem>
                <MenuItem>Popularity</MenuItem>
                <MenuItem>Average Rating</MenuItem>
    35.4- add SortSelector component to app component after PlatformSelector
        35.4.1- put SortSelector and PlatformSelector inside an horizontal stack HStack

36
