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

const theme = extendTheme({ fonts, colors })

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
