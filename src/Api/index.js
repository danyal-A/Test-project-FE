const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const APIS = {
  signUp: `${BASE_URL}/api/auth/register`,
  signIn: `${BASE_URL}/api/auth/login`,
  attachments: `${BASE_URL}/api/attachment/`,
  addComment: `${BASE_URL}/api/comments/`,
  Like: `${BASE_URL}/api/like`,
  Post: `${BASE_URL}/api/posts`,
  Profile: `${BASE_URL}/api/users`,
  suggestions: `${BASE_URL}/api/suggestion`,
  user: `${BASE_URL}/api/users`,
};
export default APIS;
