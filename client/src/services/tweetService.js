import axios from 'axios'

const getInitialData = async () => {
    const response = await axios.post('/tweet', { 'data': 'data' })
    return response.data
}

export default { getInitialData }