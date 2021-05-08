import React from 'react'
import './Login.css';
import { Card, CardTitle, CardText} from 'reactstrap';
import CardImg from 'reactstrap/lib/CardImg';
import logo from '../assets/images/logo.png';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

let prop = null;

const responseFacebook = (response, props) => {
    console.log(response);
    const { accessToken } = response;
    //const body = JSON.stringify({ "accessToken": accessToken }) 
    
    axios.get("https://agile-ateam.azurewebsites.net/login/fb/" + accessToken)
        .then(res => {
            const { token } = res.data;
            //console.log(token);
            localStorage.setItem('token', token)
            console.log('token data: ' + localStorage.getItem('token'));
            prop.onLogin(true);
        })
        .catch(error => console.log(error));
        
}

const componentClicked = () => {
    console.log("clicked");
}

export const Login = (props) =>{
    prop = props;
    
    return (
    <div className="login-wrapper">
        <div className="login--wrapper__overlay"/>
        <Card body className="card--login text-center">
            <CardImg top className="card--login__logo" src={logo} alt="card image cap" />
            <CardTitle tag="h5">Üdvözlünk az ImageHubon</CardTitle>
            <CardText>A folytatáshoz be kell jelentkezned a facebook profiloddal.</CardText>
            <FacebookLogin
                appId="313994553391078"
                fields="first_name
                last_name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                scope="public_profile"
                textButton = "Bejelentkezés Facebookkal" 
                version = "10.0" />
        </Card>
    </div>)
}