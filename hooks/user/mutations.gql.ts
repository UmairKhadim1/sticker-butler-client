import { gql } from '@apollo/client';
export const createUserMutation = gql`
  mutation createUserMutation(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        name: $name
      }
    ) {
      status
      message
      __typename
    }
  }
`;

export const refreshTokenMutation = gql`
  mutation refreshTokenMutation($accessToken: String!, $refreshToken: String!) {
    refreshToken(
      input: { accessToken: $accessToken, refreshToken: $refreshToken }
    ) {
      sessionId
      tokens {
        accessToken
        refreshToken
      }
      user {
        _id
        store
        name
        email
        profilePhoto
        addressBook {
          _id
          address1
          address2
          city
          state
          zipCode
        }
      }
    }
  }
`;
export const userLoginMutation = gql`
  mutation userLoginMutation($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      status
      message
      sessionId
      tokens {
        accessToken
        refreshToken
      }
      user {
        _id
        store
        emailVerified
        name
        email
        profilePhoto
        addressBook {
          _id
          address1
          address2
          city
          state
          zipCode
        }
      }
    }
  }
`;
export const verifyUserAccount = gql`
  mutation verifyUserAccount($token: String!) {
    VerifyAccount(input: { verifyToken: $token }) {
      status
      message
    }
  }
`;
export const resendVerifyAccountLink = gql`
  mutation resendVerifyUserAccount($reqToken: String!) {
    resendVerifyAccountLink(input: { token: $reqToken }) {
      status
      message
    }
  }
`;
export const forgotPasswordMutation = gql`
  mutation forgotPasswordMutation($email: String!) {
    forgotPassword(input: { email: $email }) {
      status
      message
    }
  }
`;
export const resetPasswordMutation = gql`
  mutation resetPasswordMutation(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      input: {
        token: $token
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      status
      message
    }
  }
`;
export const updateUserMutation = gql`
  mutation updateUserMutation($name: String, $profilePhoto: String) {
    updateUser(input: { name: $name, profilePhoto: $profilePhoto }) {
      status
      message
    }
  }
`;
export const logOutUserMutation = gql`
  mutation logOutMutation($refreshToken: String!) {
    logOut(input: { refreshToken: $refreshToken }) {
      status
      message
    }
  }
`;
export const verifyResetToken = gql`
  mutation verifyResetToken($token: String!) {
    verifiedToken(input: { token: $token })
  }
`;
