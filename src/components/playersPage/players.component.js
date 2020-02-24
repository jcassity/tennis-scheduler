import React, { Component } from 'react';
import axios from 'axios';
import DataTable from '../data-table';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreatePlayer from "./create-player.component";
import PlayerExpansion from "./playerExpansion";

export default class players extends Component {

    constructor(props) {
        super(props);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.state = { playersCollection: [], edit: false, create: false, addOrCancel: "add", editOrCancel: "edit"};
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
            console.log(data);
            return <DataTable obj={data} key={i} />;
        });
    }

    playerExpansion() {
        return this.state.playersCollection.map((data, i) => {
            return <PlayerExpansion obj={data} key={i} />;
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

    handleEditClick() {
        if(this.state.create == false){
            this.setState({create: true});
            this.setState({addOrCancel: "cancel"});
        } else {
            this.setState({create: false});
            this.setState({addOrCancel: "edit"});
        }
    }

    render() {
        return (
                <div className="wrapper-players">
                    <div>
                        <h1>Players</h1>
                        {this.playerExpansion()}
                    </div>
                    <Button className="addButton" variant="contained" color="primary" onClick={this.handleCreateClick}>{this.state.addOrCancel}</Button>
                    {this.state.create && <CreatePlayer />}
                </div>
        )
    }
}