import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import { createUser } from '../../../store/asyncMethod/UserMethod'
import GoBack from '../../../components/Shared/GoBack'
import { Helmet } from 'react-helmet'
const { Option } = Select

const Create = (props) => {
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
            <div>
                <GoBack />
                <Helmet>
                    <title>Create new user</title>
                    <meta name="description" content="Create new user" />
                </Helmet>
                <div>
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
                        <div className="form__data">
                            <h3 className="form__data__text">
                                Create new user
                            </h3>
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 4,
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
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
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
                                        <Option value="user">user</Option>
                                        <Option value="admin">admin</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Address" name="address">
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
                                        offset: 4,
                                        span: 16,
                                    }}
                                >
                                    <Button type="button" onClick={onReset}>
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
        </>
    )
}

export default Create
