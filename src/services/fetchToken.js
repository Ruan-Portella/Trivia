const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const getApi = await fetch(URL);
  const response = await getApi.json();
  return response.token;
};

export default fetchToken;
