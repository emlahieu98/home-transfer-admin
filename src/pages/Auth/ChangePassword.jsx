import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Space, Button, Form, Input, Select } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import { changePassword } from '../../store/asyncMethod/AuthMethod'

import { Helmet } from 'react-helmet'

const ChangePassword = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        delete values.confirm_password

        await changePassword(values).catch((error) => {
            toast.error(error)
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }
    const onReset = () => {
        form.resetFields()
    }

    return (
        <>
            <div className="change-password">
                <Button
                    onClick={() => history.goBack()}
                    type="primary"
                    style={{ background: '#39C449', borderColor: 'yellow' }}
                >
                    Go back
                </Button>
                <Helmet>
                    <title>Change password</title>
                    <meta name="description" content="Change password" />
                </Helmet>
                <div className="">
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
                                Change password
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
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your current password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="New password"
                                    name="new_password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your new password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm password"
                                    name="confirm_password"
                                    dependencies={['new_password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        'new_password'
                                                    ) === value
                                                ) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'The two passwords that you entered do not match!'
                                                    )
                                                )
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
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
                                        Change Password
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

export default ChangePassword
