import axios from 'axios'
const baseEndpoint = 'https://654bf13c5b38a59f28eff04f.mockapi.io/api/v1'

export const fetchSongs = async () => {
  const response = await axios.get(`${baseEndpoint}/songs`)
  return response
}

export const fetchSongById = async id => {
  const response = await axios.get(`${baseEndpoint}/songs/${id}`)
  return response
}

export const fetchAlbums = async () => {
  const response = await axios.get(`${baseEndpoint}/albums`)
  return response
}
