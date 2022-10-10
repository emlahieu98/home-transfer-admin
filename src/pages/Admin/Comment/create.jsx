import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../../components/Shared/AdminSidebar'
import AdminHeader from '../../../components/Shared/AdminHeader'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Space, Button, Form, Input, Select, Option } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import { createUser } from '../../../store/asyncMethods/UserMethod'

import { Helmet } from 'react-helmet'

const Create = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const onFinish = (values) => {
        dispatch(createUser(values))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const onReset = () => {
        form.resetFields()
    }

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ gender: 'male' })
                return
            case 'female':
                form.setFieldsValue({ gender: 'female' })
                return
            case 'other':
                form.setFieldsValue({ gender: 'other' })
        }
    }
    const onRoleChange = (value) => {
        switch (value) {
            case 'user':
                form.setFieldsValue({ role: 'user' })
                return
            case 'admin':
                form.setFieldsValue({ role: 'admin' })

                return
        }
    }
    const { loading } = useSelector((state) => state.AuthReducer)
    const { createUserError, redirect } = useSelector(
        (state) => state.UserReducer
    )

    useEffect(() => {
        if (redirect) {
            props.history.push('/admin/users')
        }
        if (createUserError) {
            toast.error(createUserError)
        }
    }, [createUserError, redirect])

    return (
        <>
            <div className="col-12 d-flex">
                <AdminSidebar />
                <div className="user col-10">
                    <AdminHeader />
                    <Button
                        onClick={() => history.goBack()}
                        type="primary"
                        style={{ background: '#39C449', borderColor: 'yellow' }}
                    >
                        Go back
                    </Button>
                    <Helmet>
                        <title>Create new user</title>
                        <meta name="description" content="Create new user" />
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
                                        <h3 className="card__h3">
                                            Create new user
                                        </h3>
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
                                                label="Password"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                            <Form.Item
                                                name="gender"
                                                label="Gender"
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    placeholder="Select a gender and change "
                                                    onChange={onGenderChange}
                                                    allowClear
                                                >
                                                    <Option value="male">
                                                        male
                                                    </Option>
                                                    <Option value="female">
                                                        female
                                                    </Option>
                                                    <Option value="other">
                                                        other
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name="role"
                                                label="Role"
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    placeholder="Select a role and change "
                                                    onChange={onRoleChange}
                                                    allowClear
                                                >
                                                    <Option value="user">
                                                        user
                                                    </Option>
                                                    <Option value="admin">
                                                        admin
                                                    </Option>
                                                </Select>
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
                                                    Create
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
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

export default Create
