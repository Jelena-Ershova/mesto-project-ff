const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '1dcbd2ac-c8ff-4fef-a887-e0089899b8a3',
    'Content-Type': 'application/json'
  }
}

const getInitial = (path) => {
  return fetch(`${config.baseUrl}${path}`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка от ${path}: ${res.status}`);
    })
}

const setProfile = (path, name, job) => {
  return fetch(`${config.baseUrl}${path}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: job
    }),
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка от ${path}: ${res.status}`);
    })
}

const addNewCard = (path, name, link) => {
  return fetch(`${config.baseUrl}${path}`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    }),
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка от ${path}: ${res.status}`);
    })
}

const getLikesCard = (path, method, idCard) => {
  return fetch(`${config.baseUrl}${path}/${idCard}`, {
    method: method,
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка от ${path}: ${res.status}`);
    })
}

const updateAvatar = (path, link) => {
  return fetch(`${config.baseUrl}${path}`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: link
    }),
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка от ${path}: ${res.status}`);
    })
}

const deleteCard = (path, idCard) => {
  return fetch(`${config.baseUrl}${path}/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка от ${path}/${idCard}: ${res.status}`);
    })
}

export { getInitial, setProfile, addNewCard, getLikesCard, updateAvatar, deleteCard };