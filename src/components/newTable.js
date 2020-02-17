import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { FaAngleDown } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

import "../playerTable.css"

export default class ParentComponent extends Component {
    constructor() {
        super();
        
        this.state = {
            data : [],
            expandedRows : []
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
                <td>{item._id}</td>
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
                    <Paper elevation={3}>
                    <td>
                        Wins: {item.wins}
                    </td>
                    <td>
                        Losses: {item.losses}
                    </td>
                    </Paper>
                </tr>
            );
        }
        
        return itemRows;    
    }
    
    render() {
        let allItemRows = [];
        
        this.state.data.map(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });
        
        return (
			    <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                            <tr>
                                <td>Players</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allItemRows}
                            <Button className="addButton" variant="contained" color="primary" href="/createPlayer">Add</Button>
                        </tbody>
                </table>
        );
    }
}