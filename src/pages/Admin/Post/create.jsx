import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GoBack from '../../../components/Shared/GoBack'
import { Button, Form, Input, Select, Upload, Tag } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { getAllCategories } from '../../../store/asyncMethod/CategoryMethod'
import { createPost } from '../../../store/asyncMethod/PostMethod'
import { BASE_URL } from '../../../config'
import QuillEditor from './QuillEditor'
import { REDIRECT_FALSE } from '../../../store/types/CommonTypes.js'
import slugNpm from 'slug'
import axios from 'axios'

import { Helmet } from 'react-helmet'

const Create = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const { user, loading } = useSelector((state) => state.AuthReducer)
    const { createPostError, redirect } = useSelector(
        (state) => state.PostReducer
    )

    const [files, setFiles] = useState([])

    useEffect(() => {
        dispatch(getAllCategories(1, 20))
    }, [])

    useEffect(() => {}, [])

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
            props.history.push('/admin/posts')
        }
    }, [redirect])

    useEffect(() => {
        if (createPostError) {
            toast.error(createPostError)
        }
    }, [createPostError])

    const beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg/png'
        if (!isJPG) {
            alert('You can only upload JPG file!')
        }
        return false
    }

    const uploadImagePost = (info) => {
        return `${BASE_URL}/common/upload-file`
    }

    const handleTitleChange = (e) => {
        const slug = slugNpm(e.target.value)

        form.setFieldsValue({ slug })
    }

    const onEditorChange = (value) => {
        form.setFieldsValue({ content: value })
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }
    const onFinish = (values) => {
        console.log(
            '🚀 ~ file: create.jsx ~ line 137 ~ onFinish ~ values',
            values
        )
        values.image = values.image.file.response.data.url

        dispatch(createPost(values))
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }
    const onReset = () => {
        form.resetFields()
    }

    return (
        <>
            <div className="post">
                <GoBack />
                <Helmet>
                    <title>Tạo mới bài viết</title>
                    <meta name="description" content="Tạo mới bài viết" />
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
                                Tạo mới bài viết
                            </h3>
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 2,
                                }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tiêu đề"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tiêu đề !',
                                        },
                                    ]}
                                >
                                    <Input onChange={handleTitleChange} />
                                </Form.Item>

                                <Form.Item
                                    label="Hình ảnh"
                                    name="image"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập hình ảnh',
                                        },
                                    ]}
                                >
                                    <Upload
                                        action={uploadImagePost}
                                        maxCount={1}
                                        beforeUpload={(file) => {
                                            const isJPG =
                                                file.type === 'image/jpeg' ||
                                                file.type === 'image/png'
                                            if (!isJPG) {
                                                alert(
                                                    'Bạn chỉ có thể nhập ảnh JPG hoặc PNG !'
                                                )
                                                return false
                                            } else {
                                                return true
                                            }
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Click to upload
                                        </Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    label="Slug"
                                    name="slug"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập slug!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Nội dung"
                                    name="content"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập nội dung!',
                                        },
                                    ]}
                                >
                                    <QuillEditor
                                        onEditorChange={onEditorChange}
                                        onFilesChange={onFilesChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 2,
                                        span: 20,
                                    }}
                                >
                                    <Button type="button" onClick={onReset}>
                                        Huỷ bỏ
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginLeft: 15 }}
                                    >
                                        Tạo mới
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
