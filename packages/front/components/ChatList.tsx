import gql from "graphql-tag"
import { Query } from "react-apollo"

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
    page: 1
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

export const ChatList = () => (
  <Query query={GET_CHATS} variables={GetChatVars}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`

        return (
            <div>
                <ul>{renderChatList(data.chatList.data)}</ul>
            </div>
        );
    }}
  </Query>
);