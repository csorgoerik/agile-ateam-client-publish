import React, { useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Upload } from './components/Upload';
import { Login } from './components/Login';
import { PostAndComments } from './components/PostAndComments';
import './custom.css'

export default function App()  {
  let [isLoggedIn, setIsLoggedIn]  = useState(false)

  return (
    <>
    {!isLoggedIn && <Login onLogin={setIsLoggedIn}/>}
    {isLoggedIn &&
      <Layout>
        <Route exact path='/Home' component={Home} />
        <Route path='/Upload' component={Upload} />
        <Route path='/PostAndComments' component={PostAndComments} />
      </Layout>}
    </>
  );
}
