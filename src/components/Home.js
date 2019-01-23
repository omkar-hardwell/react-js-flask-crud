import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Home</h1>
                <hr />
                <br /><br />
                <Link to="/department">Department</Link>
                <br /><br />
                <Link to="/employee">Employee</Link>
            </div>
        );
    }
}

export default Home;
