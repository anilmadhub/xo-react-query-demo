import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stack
} from '@chakra-ui/react'

import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchSongs } from '../api'
import { Layout } from '../components/layout'

export default function Songs () {
  const {
    data: songs,
    isLoading,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
    select: res => res.data
  })

  if (error) {
    return 'Something went wrong'
  }

  if (isLoading) {
    return 'loading...'
  }

  return (
    <Layout>
      <Button onClick={refetch} colorScheme='green'>
        {isRefetching ? 'Refetching...' : 'Refetch'}
      </Button>
      <Spacer mt={5} />
      <List>
        <ListItem>
          <Stack direction='row'>
            <Box>
              <ListIcon as={CheckIcon} color='white' />
            </Box>
            <Box width={300}>
              <strong>Song</strong>
            </Box>
            <Box width={100}>
              <strong>Type</strong>
            </Box>
          </Stack>
        </ListItem>
        {songs.map(s => (
          <ListItem key={s.id}>
            <Stack direction='row'>
              <Box>
                <ListIcon as={CheckIcon} color='green.500' />
              </Box>
              <Box width={300}>{s.name}</Box>
              <Box width={100}>{s.genre}</Box>
              <Box>
                <Link to={`/songs/${s.id}`}>More details</Link>
              </Box>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}
