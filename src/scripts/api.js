const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "7b863707-9e6a-4a46-bfb7-d7be14aaff4b",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

export const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

export const postProfileData = async (nameValue, descriptionValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": config.headers["Content-Type"],
      authorization: config.headers.authorization,
    },
    body: JSON.stringify({
      name: nameValue,
      about: descriptionValue,
    }),
  }).then(handleResponse);
};

export const postCardData = async (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": config.headers["Content-Type"],
      authorization: config.headers.authorization,
    },
    body: JSON.stringify(cardData),
  }).then(handleResponse);
};

export const deleteCardData = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

export const toggleLike = async (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

export const postAvatarData = async (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      "Content-Type": config.headers["Content-Type"],
      authorization: config.headers.authorization,
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(handleResponse);
};