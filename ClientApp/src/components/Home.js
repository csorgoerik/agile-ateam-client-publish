import React, { Component } from 'react';
import './Home.css';
import {Container, Row, Col} from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import axios from 'axios';
import { Link} from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      error: null,
      imageIsLoaded: false
    }
  }

  componentDidMount() {
    axios.get('https://agile-ateam.azurewebsites.net//posts/')
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.data
        })
      }
      );
    }

  render () {
    const { items } = this.state;
    console.log(items)
    return (
      <Container>
        <h1 className="text-center page-header">Folyam</h1>
        <Row>
          {items.map(item =>
            <Col xs="12" sm="12" md="6" lg="4" className="image-item" key={item.postID}>
              <Link onClick={() => localStorage.setItem('id', item.postID)} to={'/postandcomments'}>
                <Card className="card--post">
                  <CardImg top className="card-img"  src={'https://agile-ateam.azurewebsites.net/posts/images/' + item.postID} alt="Card image cap" />
                  <CardBody>
                    <CardTitle tag="h5">{`${item.userName} képe`}</CardTitle>
                    <CardText>
                      {item.description}
                    </CardText>
                    <CardText>
                      {item.postTime}
                    </CardText>
                  </CardBody>
                </Card>
                </Link>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}