import * as React from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
// import { useDemoData } from '@material-ui/x-grid-data-generator';

const rows: RowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];

// let columns: ColDef[] = []


export default function AutoPaginationGrid() {
    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100,
    //     maxColumns: 6,
    // });
    const columns = ([{ field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    ])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid autoPageSize pagination rows={rows} columns={columns} rowLength={100}
    maxColumns={6}/>
        </div>
    );
}
