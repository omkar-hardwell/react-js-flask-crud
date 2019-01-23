import React from 'react';
import { Link } from "react-router-dom";
import ApiCall from '../helpers/Api';

class DepartmentView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            department_list: [],
            page: null,
            page_size: null,
            total_pages: null,
            total_records: null,
            total_records_per_page: null
        }
    }

    componentDidMount() {
        ApiCall('/department', 'GET').then(res => {
            this.setState({
                department_list: res['departments'],
                page: res['page'],
                page_size: res['page_size'],
                total_pages: res['total_pages'],
                total_records: res['total_records'],
                total_records_per_page: res['total_records_per_page']
            });
        });
    }

    deleteDepartment = (e, department_id, key) => {
        e.preventDefault();

        ApiCall("/department/" + department_id, "DELETE").then(res => {
            alert(res);
            this.state.department_list.splice(key, 1);
            this.setState({department_list: this.state.department_list});
        });
    };

    render() {
        let departments = this.state.department_list.map((department, i) => {
            return (
                <tr key={i}>
                    <td>{ department.department_id }</td>
                    <td>{ department.name }</td>
                    <td>
                        <Link to={"department/edit/" + department.department_id} className="link_button_action">Edit</Link>
                        <Link to="/" className="link_button_action" onClick={(e) => this.deleteDepartment(e, department.department_id, i)}>Delete</Link>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div>
                    <span style={{ textAlign: "center" }}><h1>Departments</h1></span>
                    <span>
                        <Link to="/"><img src="/icon-home.png" alt="Home" /></Link>
                    </span>
                    <hr />
                    <table>
                        <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {departments}
                        </tbody>
                    </table>
                    <br /><br />
                    <div style={{ textAlign: "center" }}>
                        <Link to="/department/add" className="link_button">Add New Record</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DepartmentView;
