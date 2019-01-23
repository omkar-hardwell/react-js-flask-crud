import React from "react";
import { Link } from "react-router-dom";
import ApiCall from "../helpers/Api";

class DepartmentAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dept_name: ""
        }
    }

    addDepartment = (e) => {
        e.preventDefault();

        if (this.state.dept_name.trim() === "") {
            alert("Please fill the required detail.\nDepartment name");
            return false;
        }

        let postData = {
            "name": this.state.dept_name,
        };
        ApiCall("/department", "POST", postData).then(res => {
            this.props.history.push("/department")
        });
    };

    render() {
        return (
            <div style={{ Align: "center" }}>
                <span style={{ textAlign: "center" }}><h1>Add Department Detail</h1></span>
                <span>
                    <Link to="/"><img src="/icon-home.png" alt="Home" /></Link>
                    <span style={{ margin: "10px" }}>/</span>
                    <Link to="/department">Department</Link>
                </span>
                <hr />
                <form method="POST" name="add_form" id="add_form" className="form-align" onSubmit={this.addDepartment}>
                    <label>Department Name:</label>
                    <input type="text" name="dept_name" id="dept_name" value={this.state.dept_name} onChange={e => this.setState({dept_name: e.target.value})} />
                    <br /><br />

                    <span style={{ textAlign: "center" }}>
                        <button type="submit" className="link_button form-button">Submit</button>
                    </span>
                </form>
            </div>
        );
    }
}

export default DepartmentAdd;
