import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { FaAngleDown } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import "../playerTable.css"

export default class ParentComponent extends Component {
    constructor() {
        super();
        
        this.state = {
            data : [],
            expandedRows : [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/players')
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
        
        const newExpandedRows = isRowCurrentlyExpanded ? 
			currentExpandedRows.filter(_id => _id !== rowId) : 
			currentExpandedRows.concat(rowId);
        
        this.setState({expandedRows : newExpandedRows});
    }

    deletePlayer(id){
        console.log(id);
        axios.delete('http://localhost:4000/players/delete/' + id);
        window.location.reload(false);
    }
    
    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item._id);
        const itemRows = [
			<tr onClick={clickCallback} key={"row-data-" + item._id}>
			    <td>{item.name}</td>
                <td>
                    <Button variant="contained" color="primary">edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.deletePlayer(item._id)}>delete</Button>
                    <span className="icon"><FaAngleDown /></span>
                </td>
			</tr>
        ];
        
        if(this.state.expandedRows.includes(item._id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item._id}>
                    <Card className="playerCard">
                        <CardContent className="playerContent">
                            Wins: {item.wins}<br></br>
                            Losses: {item.losses}<br></br>
                            Team: Ten-Aces
                        </CardContent>
                    </Card>
                </tr>
            );
        }
        
        return itemRows;    
    }
    
    render() {
        const handleClose = () => {
            this.state.setOpen = false;
          };
        let allItemRows = [];
        
        this.state.data.map(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });
        
        return (
            <div>
			    <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                            <tr>
                                <td>Players</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allItemRows}
                        </tbody>
                </table>
            </div>
        );
    }
}