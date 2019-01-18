import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_CHATS = gql`
    query ChatList {
        chatList($count: Float!, $page: Float!) {
            data {
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

export const ChatList = () => (
  <Query query={GET_CHATS} variables={{GetChatVars}}>
    {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
    
        let chats = []
        for (let chat of data.data) {
            chats.push(<li>{ chat.picture }{ chat.name }</li>)
        }

        return (
            <div>
                <ul>{ chats }</ul>
            </div>
        );
    }}
  </Query>
);