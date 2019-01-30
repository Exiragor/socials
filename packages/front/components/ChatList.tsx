import gql from "graphql-tag"
import { Query } from "react-apollo"
import { connect } from 'react-redux'
import {} from '../store/user/actions'
import { setChats } from '../store/chats/actions'

const GET_CHATS = gql`
    query ChatList($count: Float!, $page: Float!) {
        chatList(count: $count, page: $page) {
            data {
                id
                name
                picture
            }
            totalCount
            currentPage
            totalPages
        }
    }
`;

const GetChatVars = {
    count: 5,
    page: 2
}

type chatObj = {
    id: string
    name: string
    picture: string
}

const renderChatList = (chats: chatObj[]) => 
    chats.map(({id, name, picture}) => (
        <li key={id}>
            <img style={{ width: '100px' }} src={ picture } alt={ name } />
            { name }
        </li>
    ))

export const ChatList = connect()(({ dispatch }) => (
  <Query query={GET_CHATS} variables={GetChatVars}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        
        dispatch(setChats(data.chatList.data))

        return (
            <div>
                <ul>{renderChatList(data.chatList.data)}</ul>
            </div>
        );
    }}
  </Query>
));