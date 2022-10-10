import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AuthReducer from './reducers/AuthReducer'
import { UserReducer } from './reducers/UserReducer'
import { PostReducer } from './reducers/PostReducer'
import { CategoryReducer } from './reducers/CategoryReducer'
import { CommentReducer } from './reducers/CommentReducer'
const rootReducers = combineReducers({
    AuthReducer,
    UserReducer,
    PostReducer,
    CategoryReducer,
    CommentReducer,
})
const middlewares = [thunkMiddleware]
const Store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
)
export default Store
