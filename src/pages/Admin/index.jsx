import { Helmet } from 'react-helmet'

const index = () => {
    return (
        <div className="dashboard">
            <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard" />
            </Helmet>
            Dashboard
        </div>
    )
}

export default index
