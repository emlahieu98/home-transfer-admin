import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../../components/Shared/AdminSidebar'
import AdminHeader from '../../../components/Shared/AdminHeader'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import { getUserDetail, editUser } from '../../../store/asyncMethods/UserMethod'
import { USER_RESET } from '../../../store/types/UserTypes.js'
import { Helmet } from 'react-helmet'

const Edit = (props) => {
    const { id } = props.match.params
    const history = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('value', values)
        dispatch(editUser(id, values))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const onReset = () => {
        form.resetFields()
    }
    const { loading } = useSelector((state) => state.AuthReducer)
    const { user, userStatus, editUserError, redirect } = useSelector(
        (state) => state.UserReducer
    )

    useEffect(() => {
        if (userStatus) {
            form.setFieldsValue({
                email: user.email,
                gender: user.gender,
                name: user.name,
                address: user.address,
                role: user.role,
                phone: user.phone,
            })
            dispatch({ type: USER_RESET })
        } else {
            dispatch(getUserDetail(id))
        }
    }, [user])

    useEffect(() => {
        if (redirect) {
            props.history.push('/admin/users')
        }
        if (editUserError) {
            toast.error(editUserError)
        }
    }, [editUserError, redirect])

    return (
        <>
            <div className="user">
                <Button
                    onClick={() => history.goBack()}
                    type="primary"
                    style={{ background: '#39C449', borderColor: 'yellow' }}
                >
                    Go back
                </Button>
                <Helmet>
                    <title>Edit user</title>
                    <meta name="description" content="Edit user" />
                </Helmet>
                <div className="row mt-3 wrapper">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        toastOptions={{
                            duration: 1000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                                fontSize: 13,
                            },
                        }}
                    />
                    <div className="container">
                        <div className="row ml-minus-15 mr-minus-15">
                            <div className="col-12 p-15">
                                <div className="card card__form">
                                    <h3 className="card__h3">Edit user</h3>
                                    <Form
                                        form={form}
                                        name="basic"
                                        labelCol={{
                                            span: 8,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message:
                                                        'The input is not valid E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Username"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your username!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Address"
                                            name="address"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Phone"
                                            name="phone"
                                            rules={[]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8,
                                                span: 16,
                                            }}
                                        >
                                            <Button
                                                type="button"
                                                onClick={onReset}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                style={{ marginLeft: 15 }}
                                            >
                                                Edit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        </>
    )
}

export default Edit
