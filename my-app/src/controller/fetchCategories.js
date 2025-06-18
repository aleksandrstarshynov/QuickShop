const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Ошибка при загрузке категорий');
  }

  return res.json();
};