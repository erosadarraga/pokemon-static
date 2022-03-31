import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getAPIData } from '../../api'
import { Layout } from '../../components/layouts'
import { PokeData, PokemonFull } from '../../interfaces'
import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react';
import { Species, Sprites } from '../../interfaces/pokemonFull';
import { getPokemonInfo, localFavorites } from '../../utils'
import confetti from "canvas-confetti"
import { Result } from '../../interfaces/pokeData';


interface Props {
    pokemon: PokemonFull

}

const PokemonPagesName: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorite(pokemon.id))

    console.log(pokemon)

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)
        if (isInFavorites) return
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }
    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: "5px" }
            } gap={2} >
                <Grid xs={12} sm={4} >
                    <Card hoverable css={{ padding: "30px" }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || "No image.pgn"}
                                alt={pokemon.name}
                                width="100%"
                                height={200} />

                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8} >
                    <Card>
                        <Card.Header css={{
                            display: 'flex',
                            justifyContent: "space-between"
                        }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color='gradient'
                                ghost={!isInFavorites}
                                onClick={onToggleFavorite}>
                                {isInFavorites ? " Ya es favorito" : " Guardar en favoritos"}


                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprite:</Text>
                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container >
        </Layout >
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { results }: PokeData = await getAPIData(` https://pokeapi.co/api/v2/pokemon?limit=151`)
    const pokemonsNames: string[] = results.map(pokemon => pokemon.name)

    return {
        paths: pokemonsNames.map(name => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string }


    return {
        props: {
            pokemon:await getPokemonInfo(name)
        }
    }
}

export default PokemonPagesName