const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;
const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=`;

export const fetchMovies = async (query, page) => {
  try {
    const response = await fetch(`${baseUrl}${page}&query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchPopularMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiToken} `,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

if (!apiKey) throw new Error('API ключ не задан');

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
    );
    if (!response.ok) {
      throw new Error(
        (await response.json()).status_message || 'Ошибка при получении жанров',
      );
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    throw new Error(`Ошибка при получении жанров: ${error.message}`);
  }
};

export const createSession = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
    );
    if (!response.ok) {
      throw new Error(
        (await response.json()).status_message || 'Ошибка при создании сессии',
      );
    }
    const data = await response.json();
    return data.guest_session_id;
  } catch (error) {
    throw new Error(`Ошибка при создании сессии: ${error.message}`);
  }
};

export const rateMovie = async (movie, ratingValue, sessionId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: ratingValue }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.status_message || 'Failed to rate movie');
    }
  } catch (error) {
    throw new Error(error.message || 'Error in rating movie');
  }
};
