import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.wins}
                </td>
                <td>
                    {this.props.obj.losses}
                </td>
            </tr>
        );
    }
}

export default DataTable;