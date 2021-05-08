import React, { Component } from 'react';
import './PostAndComments.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Button, Input} from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class PostAndComments extends Component {
    static displayName = PostAndComments.name;
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            postID: localStorage.getItem('id'),
            Text: ''
        }
    }

    TextChanged = event => {
        this.setState({
            Text: event.target.value
        })
    }


    componentDidMount() {
        axios.get('https://agile-ateam.azurewebsites.net/posts/' + this.state.postID).then(result => this.setState({item: result.data}));
        }
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        //const fd = new FormData();
        const token = localStorage.getItem('token');
        console.log(token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        //fd.append('Text', this.state.Text);
        axios.post('https://agile-ateam.azurewebsites.net/posts/AddComment/' + this.state.postID, {Text: this.state.Text},config)
        .then(res => {
            console.log(res);
            if (res.status === 200){
                toast.success('Komment sikeresen elküldve',{
                    position: "bottom-right"});
                axios.get('https://agile-ateam.azurewebsites.net/posts/' + this.state.postID).then(result => this.setState({item: result.data}));    
                this.forceUpdate()
            }
        })
      }

    render() {
        console.log(this.state);
        return (
            <>
            {this.state.item &&<Container>
                <Card className="card--post">
                    <CardImg top className="card-img"  src={'https://agile-ateam.azurewebsites.net/posts/images/' + this.state.postID} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">{`${this.state.item.userName} képe`}</CardTitle>
                        <CardText>
                            {this.state.item.description}
                        </CardText>
                        <CardText>
                            {this.state.item.postTime}
                        </CardText>
                    </CardBody>
                </Card>
                <Row>
                    {this.state.item.comments.map(comment =>
                        <Col xs="12" sm="12" md="6" lg="4" className="image-item">
                            <Card className="comment-card" inverse color="primary">
                                <CardBody>
                                <CardTitle>{comment.creator.userName} írta</CardTitle>
                                <CardText>
                                    {comment.commentText}
                                </CardText>
                                <CardText>
                                    <small>{comment.postTime}</small>
                                </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
                <Row>
                <div className="description">
                    <h3 className="upload__title desc_label" >Komment</h3>
                    <Input type="textarea" onChange={this.TextChanged}/>
                    <Button className="button-upload upload-button" color="primary" onClick={() => {this.handleSubmit()}}>Feltöltés</Button>
                </div>
                </Row>
                <ToastContainer/>
            </Container>}
            </>
            )
    }
}
