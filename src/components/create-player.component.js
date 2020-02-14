// ** create-Player.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class CreatePlayer extends Component {


    constructor(props) {
        super(props)

        this.onChangePlayerName = this.onChangePlayerName.bind(this);
        this.onChangePlayerWins = this.onChangePlayerWins.bind(this);
        this.onChangePlayerLosses = this.onChangePlayerLosses.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            wins: '',
            losses: '',
            s: false
        }
    }

    onChangePlayerName(e) {
        this.setState({ name: e.target.value })
    }

    onChangePlayerWins(e) {
        this.setState({ wins: e.target.value })
    }

    onChangePlayerLosses(e) {
        this.setState({ losses: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const PlayerObject = {
            name: this.state.name,
            wins: this.state.wins,
            losses: this.state.losses
        };

        axios.post('http://localhost:4000/players/create', PlayerObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', wins: '', losses: '' , s: true})
    }


    render() {
        if (this.state.s === true) {
            return (
                <div>
                    <h1>Player Added!</h1>
                    <Link to='/players'>
                        <Button variant="contained">Back To Players</Button>
                    </Link>
                    <Card>
                        <CardContent>
                            <div className="wrapper">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>Add Player Name</label>
                                        <input type="text" value={this.state.name} onChange={this.onChangePlayerName} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>wins</label>
                                        <input type="number" value={this.state.wins} onChange={this.onChangePlayerWins} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Losses</label>
                                        <input type="number" value={this.state.losses} onChange={this.onChangePlayerLosses} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Create Player" className="btn btn-success btn-block" />
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }
        return (
            <Card>
                <CardContent>
                    <div className="wrapper">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Add Player Name</label>
                                <input type="text" value={this.state.name} onChange={this.onChangePlayerName} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>wins</label>
                                <input type="number" value={this.state.wins} onChange={this.onChangePlayerWins} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Losses</label>
                                <input type="number" value={this.state.losses} onChange={this.onChangePlayerLosses} className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Create Player" className="btn btn-success btn-block" />
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        )
    }
}