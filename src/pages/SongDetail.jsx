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
import { fetchSongById } from '../api'
import { Layout } from '../components/layout'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SongDetail () {
  const { id } = useParams()

  const [songId, setsongId] = useState(id)

  const {
    data: song,
    isLoading,
    isFetching,
    error
  } = useQuery({
    queryKey: ['songs', songId],
    queryFn: () => fetchSongById(songId),
    select: res => res.data,
    refetchOnWindowFocus: true
  })

  if (error) {
    console.log(error)
    return 'Something went wrong'
  }

  if (isLoading) {
    return 'loading...'
  }

  return (
    <Layout>
      <Button onClick={() => setsongId(Math.floor(Math.random() * 21))}>
        {isFetching ? 'Fetching' : 'Fetch another song'}
      </Button>
      <Spacer mt={5} />
      <List>
        <ListItem>
          <Stack direction='row'>
            <Box>
              <ListIcon as={CheckIcon} color='white' />
            </Box>
            <Box width={100}>
              <strong>Id</strong>
            </Box>
            <Box width={300}>
              <strong>Song</strong>
            </Box>
            <Box width={100}>
              <strong>Type</strong>
            </Box>
            <Box width={100}>
              <strong>Likes</strong>
            </Box>
            <Box width={100}>
              <strong>Album</strong>
            </Box>
          </Stack>
        </ListItem>

        <ListItem key={song.id}>
          <Stack direction='row'>
            <Box>
              <ListIcon as={CheckIcon} color='green.500' />
            </Box>
            <Box width={100}>{song.id}</Box>
            <Box width={300}>{song.name}</Box>
            <Box width={100}>{song.genre}</Box>
            <Box width={100}>{song.likes}</Box>
            <Box width={100}>{song.album}</Box>
          </Stack>
        </ListItem>
      </List>
    </Layout>
  )
}
