import React, { useEffect } from 'react'
import Table from '../../../components/Table/index'
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Space, Button, Tag, Popconfirm } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import queryString from 'query-string'
import { useHistory, Link } from 'react-router-dom'
import {
    deleteComment,
    getAllComments,
} from '../../../store/asyncMethod/CommentMethod'
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Content',
        dataIndex: 'content',
    },
    {
        title: 'Author',
        dataIndex: ['userId', 'name'],
    },
    {
        title: 'Post',
        dataIndex: ['postId', 'title'],
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Popconfirm
                    title="Sure to delete comment?"
                    onConfirm={() => handleDelete(record.id)}
                >
                    <Link>
                        <RiDeleteBinLine />
                    </Link>
                </Popconfirm>
            </Space>
        ),
    },
]
const handleDelete = (id) => {
    deleteComment(id)
}

const Index = () => {
    const { loading } = useSelector((state) => state.AuthReducer)
    const { comments, totalDocs } = useSelector((state) => state.CommentReducer)
    const history = useHistory()
    const dispatch = useDispatch()
    // eslint-disable-next-line no-restricted-globals
    let { page = 1, page_size = 5 } = queryString.parse(location.search)
    const pagination = {
        position: ['none', 'bottomCenter'],
        total: totalDocs,
        pageSize: parseInt(page_size) ?? 5,
        current: parseInt(page) ?? 1,
        pageSizeOptions: ['5', '10', '20', '30', '50'],
        showSizeChanger: true,
        showTotal: (total) => `Total: ${totalDocs} items `,
    }
    const handlePagination = ({ current, pageSize }) => {
        history.push(`/admin/comments?page=${current}&page_size=${pageSize}`)
    }
    useEffect(() => {
        dispatch(getAllComments(page, page_size))
    }, [page, page_size])

    return (
        <div className="comment">
            <Helmet>
                <title>Get all comment</title>
                <meta name="description" content="Get all comment" />
            </Helmet>
            <Table
                columns={columns}
                data={comments}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        </div>
    )
}

export default Index
