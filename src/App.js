import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import EmployeeView from './components/EmployeeView';
import EmployeeAdd from './components/EmployeeAdd';
import EmployeeEdit from './components/EmployeeEdit';
import DepartmentView from './components/DepartmentView';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/employee" exact component={EmployeeView} />
                        <Route path="/employee/add" exact component={EmployeeAdd} />
                        <Route path="/employee/edit/:id" exact component={EmployeeEdit} />
                        <Route path="/department" exact component={DepartmentView} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
