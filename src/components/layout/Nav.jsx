import { Box, Button, Spinner, Stack, Text } from '@chakra-ui/react'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  const isFetching = useIsFetching()
  const queryClient = useQueryClient()
  const invalidateQueryHandler = () =>
    queryClient.invalidateQueries({ queryKey: ['albums'] })

  // const isFetchingSongs = useIsFetching({ queryKey: ['songs'] })

  const renderLink = (isActive, text) =>
    isActive ? (
      <Text color='green' as='b'>
        {text}
      </Text>
    ) : (
      text
    )

  return (
    <Stack direction='row' spacing='24px'>
      <Box h='40px'>
        <NavLink to='/'>
          {({ isActive }) => renderLink(isActive, 'Songs(old)')}
        </NavLink>
      </Box>
      <Box h='40px'>
        <NavLink to='/songs'>
          {({ isActive }) => renderLink(isActive, 'Songs')}
        </NavLink>
      </Box>
      <Box h='40px'>
        <NavLink to='/albums'>
          {({ isActive }) => renderLink(isActive, 'Albums')}
        </NavLink>
      </Box>

      <Box h='40px'>
        <Button variant='link' onClick={invalidateQueryHandler}>
          Refetch albums
        </Button>
      </Box>
      {isFetching > 0 && (
        <Box h='40px'>
          <Spinner />
        </Box>
      )}
    </Stack>
  )
}
