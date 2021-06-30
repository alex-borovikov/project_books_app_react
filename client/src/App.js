import React from 'react';
import Dashboard from "./Pages/DashBoard/Dashboard";
import ManageBooks from "./Pages/ManageBooks/ManageBooks";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Grid} from "@material-ui/core";
import './App.scss'
import {BookProvider} from "./context";


const App =  () => {
    return (
        <BookProvider>
            <Grid item md={10} className='grid__container' >
                <Router>
                    <Switch>
                        <Route path='/' exact component={Dashboard}/>
                        <Route path='/manage' component={ManageBooks} />
                    </Switch>
                </Router>
            </Grid>
        </BookProvider>
    );
};

export default App;