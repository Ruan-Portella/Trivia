export const fetchApi = async (amount, category, difficulty, type) => {
  const token = localStorage.getItem('token');
  const categorySettings = category !== '' ? `&category=${category}` : '';
  const difficultySettings = difficulty !== '' ? `&difficulty=${difficulty}` : '';
  const typeSettings = type !== '' ? `&type=${type}` : '';
  const URL = `https://opentdb.com/api.php?amount=${amount}`;

  const response = await fetch(
    `${URL}${categorySettings}${difficultySettings}${typeSettings}&token=${token}`,
  );
  const data = await response.json();
  console.log(data);
  return data;
};
