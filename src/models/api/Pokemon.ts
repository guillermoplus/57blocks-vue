import type Sprites from "@/models/api/Sprites";

interface Pokemon {
    id: number | string,
    name: string,
    height: number,
    weight: number,
    sprites: Sprites,
}

export default Pokemon;