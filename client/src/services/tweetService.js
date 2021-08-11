import axios from 'axios'

const getInitialData = async () => {
    const response = await axios.get('/initial')
    return response.data
}

const searchTweets = async (search) => {
    const response = await axios.post('/search', search)
    return response.data
}

export default { getInitialData, searchTweets }