import React from "react";
import ApiCall from "../helpers/Api";

class DepartmentEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dept_name: ""
        }
    }

    componentDidMount() {
        ApiCall("/department/" + this.props.match.params.id, "GET").then(res => {
            this.setState({
                dept_name: res["department"].name
            });
        });
    }

    editDepartment = (e) => {
        e.preventDefault();

        if (this.state.dept_name.trim() === "") {
            alert("Please fill the required detail.\nDepartment name");
            return false;
        }

        let putData = {
            "name": this.state.dept_name,
        };
        ApiCall("/department/" + this.props.match.params.id, "PUT", putData).then(res => {
            this.props.history.push("/department")
        });
    };

    render() {
        return (
            <div style={{ Align: "center" }}>
                <span style={{ textAlign: "center" }}><h1>Edit Department Detail</h1></span>
                <hr />
                <form method="POST" name="edit_form" id="edit_form" className="form-align" onSubmit={this.editDepartment}>
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

export default DepartmentEdit;
