import { useEffect } from 'react'
import Table from '../../../components/Table/index'
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Space, Button, Tag, Popconfirm } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import queryString from 'query-string'
import { useHistory, Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../../../store/asyncMethod/UserMethod'

const colorRoles = [
    {
        role: 'user',
        color: 'green',
    },
    {
        role: 'admin',
        color: 'volcano',
    },
]
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        render: (status) => (
            <>
                {colorRoles.map((item) => {
                    if (item.role == status) {
                        return (
                            <Tag color={item.color}>{status.toLowerCase()}</Tag>
                        )
                    }
                })}
            </>
        ),
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={`/admin/edit-user/${record._id}`}>
                    <GrEdit />
                </Link>
                <Popconfirm
                    title="Sure to delete user?"
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
    deleteUser(id)
}

const Index = () => {
    const { loading } = useSelector((state) => state.AuthReducer)
    const { users, totalDocs } = useSelector((state) => state.UserReducer)
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
        history.push(`/admin/users?page=${current}&page_size=${pageSize}`)
    }
    useEffect(() => {
        dispatch(getAllUsers(page, page_size))
    }, [page, page_size])

    return (
        <div className="user">
            <Helmet>
                <title>Get all user</title>
                <meta name="description" content="Get all user" />
            </Helmet>
            <Button
                onClick={() => history.push('/admin/create-user')}
                type="primary"
                style={{ background: '#39C449', borderColor: 'yellow' }}
            >
                Create new user
            </Button>
            <Table
                columns={columns}
                data={users}
                pagination={pagination}
                handlePagination={handlePagination}
            />
        </div>
    )
}

export default Index
