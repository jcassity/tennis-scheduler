import React from 'react';

export const columns = [
    {
      Header: () => (
        <div />
      ),
      accessor: 'name',
      maxWidth: 300,
      Cell: row => (
        <div className='first-column'>{row.value}</div>
      )
    }
  ];
  
  export const subComponent = row => {
    return (
      <div>
        {row.original.types.map((type, id) => {
          return (
            <div className='subRow' key={ id }>{ type.name }</div>
          );
        })}
      </div>
    );
  };