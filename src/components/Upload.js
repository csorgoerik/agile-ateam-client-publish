import React, { Component } from 'react';
import {Container, Button, Input} from 'reactstrap';
import './Upload.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Upload extends Component {
    static displayName = Upload.name;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedFile: null ,
            description: null 
        }
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    descriptionChanged = event => {
        this.setState({
            description: event.target.value
        })
    }

    upload() {
        const fd = new FormData();
        const token = localStorage.getItem('token');
        console.log(token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        fd.append('PictureData', this.state.selectedFile)
        fd.append('Description', this.state.description)
        axios.post('https://agile-ateam.azurewebsites.net/posts/', fd,config)
        .then(res => {
            console.log(res);
            if (res.status === 200){
                toast.success('Képfeltöltés sikeres',{
                    position: "bottom-right"});
            }
        })
    }

    render() {
        return (
            <Container>
                <div className="upload-wrapper">
                    <h1 className="text-center page-header">Képfeltöltés</h1>
                    <div className="upload">
                        <h3 className="upload__title">Válassz képet</h3>
                        <Input type="file" onChange={this.fileSelectedHandler}/>
                    </div>
                    <div className="description">
                        <h3 className="upload__title desc_label" >Leírás</h3>
                        <Input type="textarea" onChange={this.descriptionChanged}/>
                    </div>
                    <Button className="button-upload" color="primary" onClick={() => {this.upload()}}>Feltöltés</Button>
                </div>
                <ToastContainer/>
            </Container>
        )
    }
}
