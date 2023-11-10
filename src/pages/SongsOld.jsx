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

import { useEffect, useState } from 'react'
import { fetchSongs } from '../api'

export default function SongsOld () {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // on click fetch songs again
  const fetchSongsHandler = () => {
    setLoading(true)
    fetchSongs()
      .then(response => {
        setSongs(response.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setError(e)
      })
  }

  // on initial loading
  useEffect(() => {
    fetchSongs()
      .then(response => {
        setSongs(response.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setError(e)
      })
  }, [])

  if (error) {
    return 'Something went wrong'
  }

  if (loading) {
    return 'loading...'
  }

  return (
    <>
      <Button onClick={fetchSongsHandler} colorScheme='blue'>
        Refetch
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
                <Button variant='link'>More details</Button>
              </Box>
            </Stack>
          </ListItem>
        ))}
      </List>
    </>
  )
}