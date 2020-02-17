import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewTable from "./newTable";
import CreatePlayer from "./create-player.component";

export default class players extends Component {

    constructor(props) {
        super(props);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.state = { playersCollection: [], create: false, addOrCancel: "add"};
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

    cancelButton() {
        return <button onClick={this.handleCancelClick}></button>
    }

    handleCreateClick() {
        if(this.state.create == false){
            this.setState({create: true});
            this.setState({addOrCancel: "cancel"});
        } else {
            this.setState({create: false});
            this.setState({addOrCancel: "add"});
        }
    }

    render() {
        return (
            <div className="wrapper-players">
                <div className="container">
                    <NewTable />
        <Button className="addButton" variant="contained" color="primary" onClick={this.handleCreateClick}>{this.state.addOrCancel}</Button>
                    {this.state.create && <CreatePlayer />}
                </div>
            </div>
        )
    }
}