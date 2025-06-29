const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

const cohortId = "wff-cohort-41";
const myId = "7b863707-9e6a-4a46-bfb7-d7be14aaff4b";

export async function getProfileData() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: myId,
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

export function getCards() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: myId,
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

export async function postProfileData(nameValue, descriptionValue) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: myId,
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

export async function postCardData(cardData) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: myId,
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

export async function deleteCardData(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: myId,
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

export async function toggleLike(cardId, isLiked) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
            authorization: myId,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        console.log(res);
        return res.json();
    }).catch((err) => {
        console.error(err);
    });
}

export async function postAvatarData(avatarUrl) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: myId,
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