import { CheckIcon } from '@chakra-ui/icons'
import {
  Badge,
  Button,
  List,
  ListIcon,
  ListItem,
  Spacer
} from '@chakra-ui/react'

import { useQuery } from '@tanstack/react-query'
import { fetchSongs } from '../api'
import { Layout } from '../components/layout'

export default function Albums () {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
    select: res => res.data.filter(s => s.likes > 60000),
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
        {data?.map(s => (
          <ListItem key={s.id}>
            <ListIcon as={CheckIcon} color='green.500' />
            {s.name} - {s.genre}
            <Badge marginLeft={5} variant='outline' colorScheme='cyan'>
              {s.likes}
            </Badge>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}
