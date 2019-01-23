import React from 'react';
import { Link } from "react-router-dom";
import ApiCall from '../helpers/Api';

class EmployeeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employee_list: [],
            page: null,
            page_size: null,
            total_pages: null,
            total_records: null,
            total_records_per_page: null
        }
    }

    componentDidMount() {
        ApiCall('/employee', 'GET').then(res => {
            this.setState({
                employee_list: res['employees'],
                page: res['page'],
                page_size: res['page_size'],
                total_pages: res['total_pages'],
                total_records: res['total_records'],
                total_records_per_page: res['total_records_per_page']
            });
        });
    }

    deleteEmployee = (e, emmployee_id, key) => {
        e.preventDefault();

        ApiCall("/employee/" + emmployee_id, "DELETE").then(res => {
            alert(res);
            this.state.employee_list.splice(key, 1);
            this.setState({employee_list: this.state.employee_list});
        });
    };

    render() {
        let employees = this.state.employee_list.map((employee, i) => {
            return (
                <tr key={i}>
                    <td>{ employee.employee_id }</td>
                    <td>{ employee.name }</td>
                    <td>{ employee.department}</td>
                    <td>{ employee.date_of_joining }</td>
                    <td>{ employee.gender }</td>
                    <td>{ employee.address }</td>
                    <td>{ employee.salary }</td>
                    <td>
                        <Link to={"employee/edit/" + employee.employee_id} className="link_button_action">Edit</Link>
                        <Link to="/" className="link_button_action" onClick={(e) => this.deleteEmployee(e, employee.employee_id, i)}>Delete</Link>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div>
                    <span style={{ textAlign: "center" }}><h1>Employees</h1></span>
                    <span>
                        <Link to="/"><img src="/icon-home.png" alt="Home" /></Link>
                    </span>
                    <hr />
                    <table>
                        <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Date of Join</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees}
                        </tbody>
                    </table>
                    <br /><br />
                    <div style={{ textAlign: "center" }}>
                        <Link to="/employee/add" className="link_button">Add New Record</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeView;
