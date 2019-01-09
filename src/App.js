import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import EmployeeView from './components/EmployeeView';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/employee" component={EmployeeView} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
