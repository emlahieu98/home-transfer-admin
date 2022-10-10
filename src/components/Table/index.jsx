import React, { useState } from 'react'
import { Table } from 'antd'

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
}

const Index = (props) => {
    const [selectionType, setSelectionType] = useState('checkbox')

    return (
        <Table
            style={{ margin: '27px 40px' }}
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={props.columns}
            dataSource={props.data}
            pagination={props.pagination}
            onChange={props.handlePagination}
            scroll={props.scroll}
        />
    )
}

export default Index
