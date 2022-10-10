import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select, Upload, Tag, Image } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import _ from 'lodash'
import GoBack from '../../../components/Shared/GoBack'
import { getPostDetail, editPost } from '../../../store/asyncMethod/PostMethod'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import { POST_RESET } from '../../../store/types/PostTypes.js'
import QuillEditor from './QuillEditor'
import { Helmet } from 'react-helmet'
import { REDIRECT_FALSE } from '../../../store/types/CommonTypes.js'
import { BASE_URL } from '../../../config'

const Edit = (props) => {
    const { id } = props.match.params
    const history = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const { post, postStatus, editPostError, redirect } = useSelector(
        (state) => state.PostReducer
    )
    const [urlImage, setUrlImage] = useState(post?.image)

    const uploadImagePost = (info) => {
        return `${BASE_URL}/common/upload-file`
    }
    useEffect(() => {
        if (postStatus) {
            form.setFieldsValue({
                title: post.title,
                description: post.description,
                slug: post.slug,
                image: post.image,
                content: post.content,
            })
            setUrlImage(post.image)
            dispatch({ type: POST_RESET })
        } else {
            dispatch(getPostDetail(id))
        }
    }, [post])

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
            props.history.push('/admin/posts')
        }
    }, [redirect])

    useEffect(() => {
        if (editPostError) {
            toast.error(editPostError)
        }
    }, [editPostError])

    const handleUpload = (info) => {
        if (info.file.status === 'done') {
            setUrlImage(info.file.response.data.url)
            // form.setFieldsValue('image', info.file.response.data.url)
            form.setFieldsValue('image', urlImage)
        } else if (info.file.status === 'error') {
            toast.error(`${info.file.name} file upload failed.`)
        }
    }

    const onFinish = (values) => {
        values.image = urlImage
        dispatch(editPost(id, values))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    const onReset = () => {
        form.resetFields()
    }

    const onEditorChange = (value) => {
        // console.log(value)
        form.setFieldsValue({ content: value })
    }

    const onFilesChange = (files) => {
        // eslint-disable-next-line no-undef
        setFiles(files)
    }

    return (
        <div>
            <GoBack />
            <Helmet>
                <title>Edit post</title>
                <meta name="description" content="Edit post" />
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
                        <h3 className="form__data__text">Edit post</h3>
                        <Form
                            form={form}
                            name="basic"
                            className="formCreatePost"
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
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tiêu đề!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng upload ảnh!',
                                    },
                                ]}
                            >
                                <Image width={200} src={urlImage} />
                                <Upload
                                    action={uploadImagePost}
                                    onChange={handleUpload}
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button
                                        style={{
                                            marginTop: '2rem',
                                        }}
                                        icon={<UploadOutlined />}
                                    >
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
                                        message: 'Vui lòng nhập slug !',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Content"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập nội dung bài viết!',
                                    },
                                ]}
                            >
                                <QuillEditor
                                    value={post.content}
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
    )
}

export default Edit
