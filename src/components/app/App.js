import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import UsersContainer from '../users/UsersContainer'
import SignUp from '../sessions/SignUp'
import Login from '../sessions/Login'
import Dashboard from '../dashboard/Dashboard'
// import withAuth from '../auth/withAuth'
import {Link} from "react-router-dom"
import {Layout, Header, Navigation, Footer,FooterSection, FooterLinkList  } from 'react-mdl'
import { logoutUser } from '../../actions/auth'
import Messages from '../users/Messages'

class DebugRouter extends Router {
  constructor(props){
    super(props);
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

(function debug() {
  document.addEventListener('click', (e) => {
    
  })
})()

function App({ logoutUser, loggedIn }) {
  return (

    <DebugRouter>
      <Router>
        <Layout>
         
           {loggedIn ?  

            <Header title="Iceberg" className="header" scroll>
              <Navigation>  
                  <Link to ="/messages">Messages</Link>
                  <Link to ="/connect">Connect</Link>
                  <Link to ="/profile">Profile</Link>
                  
                  <button 
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      logoutUser()
                    }}
                    ><Link className="LogoutLink" to="/login">Logout</Link>
                  </button>
              </Navigation>
            </Header>

              
             :null
          } 
        
          
        </Layout>
        
        {/* push content below navbar */}
        {loggedIn && <div className="Spacer"></div>}

        <Switch>
          <Route exact path="/" />
          <Route path="/signup" render={routerProps => <SignUp {...routerProps}/>}/>
          <Route path="/login" render={routerProps => <Login {...routerProps}/>}/>
          <Route path="/connect" component={Dashboard}/> 
          <Route path="/messages" component={Messages}/> 
          <Route path="/:customPath" render={routerProps => <UsersContainer {...routerProps}/>}/>        
        </Switch>

        <Footer className= "footer"size="mini">
          <FooterSection type="left" logo="Iceberg">
            <FooterLinkList>
              <Link to="#">Help</Link>
              <Link to="#">About Us</Link>
            </FooterLinkList>
          </FooterSection>
        </Footer>
      </Router>
    </DebugRouter>

  );
}

export default connect(state => {
  return {
    loggedIn: state.auth.loggedIn
  }
}, { logoutUser })(App)

