import React from "react";
import DatePicker from "react-datepicker";
import ApiCall from "../helpers/Api";

import "react-datepicker/dist/react-datepicker.css";

class EmployeeEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            department_list: [],
            employee_list: [],
            emp_name: "",
            emp_address: "",
            emp_salary: 0,
            emp_gender: "male",
            emp_department: 0,
            emp_date_of_join: new Date()
        }
    }

    componentDidMount() {
        ApiCall("/department", "GET").then(res => {
            this.setState({
                department_list: res["departments"],
            });
        });

        ApiCall("/employee/" + this.props.match.params.id, "GET").then(res => {
            this.setState({
                emp_name: res["employee"].name,
                emp_address: res["employee"].address,
                emp_salary: res["employee"].salary,
                emp_gender: res["employee"].gender,
                emp_department: res["employee"].department_id,
                emp_date_of_join: new Date(res["employee"].date_of_joining)
            });
        });
    }

    handleChange = (value) => {
        this.setState({
            emp_date_of_join: value
        });
    };

    editEmployee = (e) => {
        e.preventDefault();

        if (this.state.emp_name.trim() === ""
            || !this.state.emp_salary
            || !this.state.emp_date_of_join
        ) {
            alert("Please fill the required detail.\nEmployee name\nDate of join\nSalary");
            return false;
        }

        let putData = {
            "name": this.state.emp_name,
            "department_id": this.state.emp_department,
            "date_of_joining": this.state.emp_date_of_join.toISOString().slice(0,10),
            "gender": this.state.emp_gender,
            "address": this.state.emp_address,
            "salary": this.state.emp_salary
        };
        ApiCall("/employee/" + this.props.match.params.id, "PUT", putData).then(res => {
            this.props.history.push("/employee")
        });
    };

    render() {
        let departments = this.state.department_list.map((department, i) => {
            return (
                <option key={i} value={department.department_id}>{department.name}</option>
            );
        });

        return (
            <div style={{ Align: "center" }}>
                <span style={{ textAlign: "center" }}><h1>Edit Employee Detail</h1></span>
                <hr />
                <form method="POST" name="edit_form" id="edit_form" className="form-align" onSubmit={this.editEmployee}>
                    <label>Employee Name:</label>
                    <input type="text" name="emp_name" id="emp_name" value={this.state.emp_name} onChange={e => this.setState({emp_name: e.target.value})} />
                    <br /><br />

                    <label>Department:</label>
                    <select name="emp_department" id="emp_department" value={this.state.emp_department} onChange={e => this.setState({emp_department: e.target.value})}>
                        {departments}
                    </select>
                    <br /><br />

                    <label>Date of join:</label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.emp_date_of_join}
                        onChange={this.handleChange}
                    />
                    <br /><br />

                    <label>Gender:</label>
                    <select name="emp_gender" id="emp_gender" value={this.state.emp_gender} onChange={e => this.setState({emp_gender: e.target.value})}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <br /><br />

                    <label>Address:</label>
                    <input type="text" name="emp_address" id="emp_address" value={this.state.emp_address} onChange={e => this.setState({emp_address: e.target.value})} />
                    <br /><br />

                    <label>Salary:</label>
                    <input type="number" name="emp_salary" id="emp_salary" value={this.state.emp_salary} onChange={e => this.setState({emp_salary: e.target.value})} />
                    <br /><br />

                    <span style={{ textAlign: "center" }}>
                        <button type="submit" className="link_button form-button">Submit</button>
                    </span>
                </form>
            </div>
        );
    }
}

export default EmployeeEdit;
