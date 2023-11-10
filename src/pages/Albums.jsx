import { InfoOutlineIcon } from '@chakra-ui/icons'
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
import { fetchAlbums } from '../api'
import { Layout } from '../components/layout'

import dayjs from 'dayjs'

export default function Albums () {
  const {
    data: albums,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
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
      <Button onClick={refetch}>
        {isFetching ? 'Fetching...' : 'Refetch'}
      </Button>
      <Spacer mt={5} />
      <List>
        <ListItem>
          <Stack direction='row'>
            <Box>
              <ListIcon as={InfoOutlineIcon} color='white' />
            </Box>
            <Box width={300}>
              <strong>Albums</strong>
            </Box>
            <Box width={100}>
              <strong>Date released</strong>
            </Box>
          </Stack>
        </ListItem>
        {albums.map(a => (
          <ListItem key={a.id}>
            <Stack direction='row'>
              <Box>
                <ListIcon as={InfoOutlineIcon} color='red.500' />
              </Box>
              <Box width={300}>{a.name}</Box>
              <Box width={200}>
                {dayjs(a.dateReleased).format('DD/MM/YYYY')}
              </Box>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}
