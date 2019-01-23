import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import EmployeeView from './components/EmployeeView';
import EmployeeAdd from './components/EmployeeAdd';
import EmployeeEdit from './components/EmployeeEdit';
import DepartmentView from './components/DepartmentView';
import DepartmentAdd from './components/DepartmentAdd';
import DepartmentEdit from './components/DepartmentEdit';
import Home from './components/Home';
import NotFound from './components/NotFound';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/employee" exact component={EmployeeView} />
                        <Route path="/employee/add" exact component={EmployeeAdd} />
                        <Route path="/employee/edit/:id" exact component={EmployeeEdit} />
                        <Route path="/department" exact component={DepartmentView} />
                        <Route path="/department/add" exact component={DepartmentAdd} />
                        <Route path="/department/edit/:id" exact component={DepartmentEdit} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
