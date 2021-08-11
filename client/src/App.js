import React, { useEffect, useState } from 'react'
import fakeData from './services/fakeData';
import {Card, Form, Button, Row }from 'react-bootstrap'
import './App.css';

const App = () => {
  const [tweets, changeTweets] = useState([])
  const [search, changeSearch] = useState('')

  useEffect(() => {
    changeTweets(fakeData)
    
  }, [])

  const clickSearch = (e) => {
    e.preventDefault()
  }

  return (
    <div className="App" style={{ marginBottom: '2rem' }}>
      <h1>Twitter Sentiments</h1>
      <p>Sample twitter sentiment for a given search</p>
      <Form onSubmit={clickSearch}>
        <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Form.Control placeholder="Ex: seahawks or #seahawks" style={{ width: '30%', marginRight: '5px' }} />
            <Button type="submit" variant="primary" style={{ width: '100px', marginLeft: '5px' }}>Analyze</Button>
        </Row>
      </Form>
      {search && <h3>Results for {search}</h3>}
      {tweets && 
      tweets.map((tweet, i) =>
        tweet.Text.length>0 && 
        <Card id={i} className={tweet.compound_score} style={{ margin: '2% 18%' }}>
          <Card.Body>{tweet.Text}</Card.Body>
        </Card>
      )}
    </div>
  );
}

export default App;
