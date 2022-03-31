import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"
import NextLink from "next/link"



export const Navbar = () => {

    const { theme } = useTheme()

    return (
        <div style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            padding: "0px 20px",
            background: theme?.colors.gray900.value
        }}>
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/739.png"
                alt="icono de la app"
                width={70}
                height={70}>

            </Image>
            <NextLink href="/" passHref><Link animated="true">

                <Text color="white" h2>P</Text>
                <Text color="white" h3>okemon</Text>
            </Link></NextLink>
            <Spacer css={{ flex: 1 }} />

            <NextLink href="/favorites">
                <Link>
                    <Text color="white" h3>Favorito</Text>
                </Link>
            </NextLink>
        </div>

    )
}
