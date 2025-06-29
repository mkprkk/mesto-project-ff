const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '7b863707-9e6a-4a46-bfb7-d7be14aaff4b',
    'Content-Type': 'application/json'
  }
}

export const getProfileData = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      name.textContent = result.name;
      description.textContent = result.about;
      avatar.style.backgroundImage = `url(${result.avatar})`;
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}

export const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      return Promise.all(
        result.map(async (card) => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            ownerId: card.owner._id,
            id: card._id,
          };
        })
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

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
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      name.textContent = result.name;
      description.textContent = result.about;
    })
    .catch((err) => {
      console.error(err);
    });
}

export const postCardData = async (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": config.headers["Content-Type"],
      authorization: config.headers.authorization,
    },
    body: JSON.stringify(cardData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
}

export const deleteCardData = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: config.headers.authorization,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    }).catch((err) => {
        console.error(err);
    });
}

export const toggleLike = async (cardId, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
            authorization: config.headers.authorization,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        (res);
        return res.json();
    }).catch((err) => {
        console.error(err);
    });
}

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
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    }).catch((err) => {
        console.error(err);
    });
}