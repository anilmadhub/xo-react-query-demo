import { Container, Spacer, VStack } from '@chakra-ui/react'
import { MainContent } from './Main'
import { Nav } from './Nav'

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <VStack>
      <Container maxW='m' centerContent pt={5}>
        <Nav />
        <Spacer mb={5} borderBottom='1px solid gray' />
        <MainContent>{children}</MainContent>
      </Container>
    </VStack>
  )
}
