import React, { Component } from 'react';
import axios from 'axios';

class DataTable extends Component {

    deletePlayer(objId){
        axios.delete("http://localhost:4000/players/delete/"+objId);
        window.location.reload(false);
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.wins}
                </td>
                <td>
                    {this.props.obj.losses}
                </td>
                <td>
                    <button>edit</button>
                    <button onClick={() => this.deletePlayer(this.props.obj._id)}>delete</button>
                </td>
            </tr>
        );
    }
}

export default DataTable;