import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import { columns, subComponent } from './tableSetup';

import "../player.css";

export default class players extends Component {

    constructor(props) {
        super(props);
        this.state = { playersCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/players')
            .then(res => {
                this.setState({ playersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.playersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-players">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Name</td>
                                <td>Wins</td>
                                <td>Losses</td>
                                <td>Delete/Edit</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                    <Link to='/createPlayer'>
                        <Button variant="contained">Add</Button>
                    </Link>
                </div>
            </div>
        )
    }
}