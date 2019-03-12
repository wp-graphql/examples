import { gql } from 'apollo-boost';

export default gql`
  mutation SendInquiry($clientId: String!, $name: String!, $email: String!, $phone: String, $url: String, $message: String!) {
    sendInquiry(input: { clientMutationId: $clientId, name: $name, email: $email, phone: $phone, url: $url, message: $message }) {
      status
      message
    }
  }
`;
