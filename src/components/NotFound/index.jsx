import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
const NotFound = () => {
    const history = useHistory()
    return (
        <div className="notFound">
            <Helmet>
                <title>404 - Not Found</title>
                <meta
                    name="description"
                    content="Oops! That page could not found"
                />
            </Helmet>
            <div className="notFound__container">
                <h1 className="notFound__container__h1">404</h1>
                <p className="notFound__container__p">
                    Oops! That page could not found
                </p>
                <Button
                    type="green"
                    shape="round"
                    icon={<SmileOutlined />}
                    size={'large'}
                    style={{ marginLeft: 40 }}
                    onClick={() => history.push('/')}
                >
                    Back to home
                </Button>
            </div>
        </div>
    )
}
export default NotFound
