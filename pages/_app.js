import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const colors = {
  primary: {
    900: '#999',
    800: '#666',
    700: '#333',
  },
}

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}


const theme = extendTheme({ colors, breakpoints })

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </main>
  )
}
