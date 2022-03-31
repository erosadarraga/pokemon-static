import { Card, Grid, Row, Text } from '@nextui-org/react'
import type { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import { getAPIData } from '../api/getAPIData'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon'
import { PokeData, Result } from '../interfaces'

interface Props {
  pokemons: Result[]
}

const HomePages: NextPage<Props> = ({ pokemons }) => {

  return (

    <Layout title='Listado de Pokemons'>

      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))
        }
      </Grid.Container>

    </Layout >

  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data: PokeData = await getAPIData("https://pokeapi.co/api/v2/pokemon?limit=151")

  const pokemons: Result[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePages
