import React from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const GoBack = () => {
    const history = useHistory()
    return (
        <div>
            <Button
                onClick={() => history.goBack()}
                type="primary"
                style={{ background: '#39C449', borderColor: 'yellow' }}
            >
                Go back
            </Button>
        </div>
    )
}

export default GoBack
