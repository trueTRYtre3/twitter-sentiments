import React, { useEffect, useState } from 'react'
import {Card, Form, Button, Row }from 'react-bootstrap'
import tweetService from './services/tweetService'
import './App.css';


const App = () => {
  const [tweets, changeTweets] = useState([])
  const [search, changeSearch] = useState('')
  const [showing, changeShowing] = useState('Seahawks')

  useEffect(() => {
    (async () => {
      const data = await tweetService.getInitialData()
      changeTweets(data)
    })()
  }, [])

  const clickSearch = async (e) => {
    e.preventDefault()
    try {
      const data = await tweetService.searchTweets({ search })
      changeTweets(data)
      changeShowing(search)
      changeSearch('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div className="App" style={{ marginBottom: '2rem' }}>
      <h1>Twitter Sentiments</h1>
      <p>Sample twitter sentiment for a given search</p>
      <Form onSubmit={clickSearch}>
        <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Form.Control 
              onChange={(e) => changeSearch(e.target.value)}
              value={search}
              placeholder="Ex: seahawks or #seahawks" 
              style={{ width: '30%', marginRight: '5px' }} 
            />
            <Button type="submit" variant="primary" style={{ width: '100px', marginLeft: '5px' }}>Analyze</Button>
        </Row>
      </Form>
      {showing && <h3>Results for {showing}</h3>}
      {tweets && 
      tweets.map((tweet, i) =>
        tweet.Text.length>0 && 
        <Card key={i} className={tweet.compound_score} 
        style={{ margin: '2% 18%', boxShadow: '0px 0px 18px 1px rgba(0, 0, 0, 0.6)' }}
        >
          <Card.Body>{tweet.Text}</Card.Body>
        </Card>
      )}
    </div>
  );
}

export default App;
