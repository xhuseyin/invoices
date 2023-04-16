import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const fonts = {
  body: 'Roboto, sans-serif',
  heading: 'Roboto, sans-serif',
}

const colors = {
  primary: {
    900: '#999',
    800: '#666',
    700: '#333',
  },
}

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
  "3xl": "120em",
  "4xl": "160em",
}

const theme = extendTheme({ fonts, colors, breakpoints })

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
