import { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { NextPage } from 'next';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';



const FavoritesPages: NextPage = () => {
    const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([])

    useEffect(() => {
        setFavoritesPokemons(localFavorites.pokemons)

    }, [])

    return (
        <Layout title='Pokemons - Favorites' >

            {favoritePokemons.length === 0 ? (<NoFavorites />) : (
                <FavoritePokemons pokemons={favoritePokemons} />
            )}

        </Layout>
    )
}

export default FavoritesPages