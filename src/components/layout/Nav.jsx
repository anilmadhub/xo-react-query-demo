import { Box, Link, Spinner, Stack } from '@chakra-ui/react'
import { useIsFetching } from '@tanstack/react-query'

export const Nav = () => {
  const isFetching = useIsFetching()

  // const isFetchingSongs = useIsFetching({ queryKey: ['songs'] })

  return (
    <Stack direction='row' spacing='24px'>
      <Box h='40px'>
        <Link href='/'>Songs(old)</Link>
      </Box>
      <Box h='40px'>
        <Link href='/songs'>Songs</Link>
      </Box>
      <Box h='40px'>
        <Link href='/albums'>Albums</Link>
      </Box>
      {isFetching > 0 && (
        <Box h='40px'>
          <Spinner />
        </Box>
      )}
    </Stack>
  )
}
