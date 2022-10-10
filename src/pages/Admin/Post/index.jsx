import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../../../components/Table/index'
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Space, Button, Tag, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { useHistory, Link } from 'react-router-dom'
import { deletePost, getAllPosts } from '../../../store/asyncMethod/PostMethod'
import { htmlToText } from 'html-to-text'
const colorStatus = [
    {
        status: 'approved',
        color: 'green',
    },
    {
        status: 'pending',
        color: 'blue',
    },
    {
        status: 'fail',
        color: 'volcano',
    },
]
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        width: 20,
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        width: 150,
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        width: 700,
        height: 300,
        render: (text, record) => <>{htmlToText(text.slice(0, 600))}</>,
    },
    {
        title: 'Chi tiết bài viết',
        width: 100,
        render: (text, record) => (
            <>
                <Button
                    type="primary"
                    shape="round"
                    onClick={() => console.log(text)}
                >
                    {'Xem thêm'}
                </Button>
            </>
        ),
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        // width: 100,
        render: (text, record) => (
            <img
                width="150"
                height="150"
                style={{
                    borderRadius: '8px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                src={`${record.image}`}
            />
        ),
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={`/admin/edit-post/${record.slug}`}>
                    <GrEdit />
                </Link>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xoá?"
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

const handleDelete = async (id) => {
    await deletePost(id)
}

const Index = () => {
    const { loading } = useSelector((state) => state.AuthReducer)
    const { posts, totalDocs } = useSelector((state) => state.PostReducer)
    const dispatch = useDispatch()
    const history = useHistory()
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
        history.push(`/admin/posts?page=${current}&page_size=${pageSize}`)
    }
    useEffect(() => {
        dispatch(getAllPosts(page, page_size))
    }, [page, page_size])

    return (
        <div className="post">
            <Helmet>
                <title>Xem toàn bộ bài viết</title>
                <meta name="description" content="Get all post" />
            </Helmet>
            <Button
                onClick={() => history.push('/admin/create-post')}
                type="primary"
                style={{ background: '#39C449', borderColor: 'yellow' }}
            >
                Tạo mới bài viết
            </Button>
            <Table
                columns={columns}
                data={posts}
                pagination={pagination}
                handlePagination={handlePagination}
                scroll={{ x: 'max-content' }}
            />
        </div>
    )
}

export default Index
