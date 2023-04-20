import useData from "./useData";

interface Platforms {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    image: string;
}
interface Platform {
    id: number;
    name: string;
    slug: string;  
    platforms: Platforms | null;  
}

const usePlatforms = () => useData<Platform>('platforms/lists/parents');

export default usePlatforms;