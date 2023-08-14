const request = require('supertest')
const app = require('../app')

const URL_GENRES = '/api/v1/genres'
let genreId

const genre = {
  name: 'Drama'
}

test('POST -> "URL_GENRES", should return status code 201, res.body.name === genre.name', async () => {
  const res = await request(app)
    .post(URL_GENRES)
    .send(genre)
  genreId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test('GET -> "URL_GENRES", should return status code 200, res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_GENRES)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('GET ONE -> "URL_GENRES/:id", should return status code 200, res.body.name === genre.name', async () => {
  const res = await request(app)
    .get(`${URL_GENRES}/${genreId}`)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test('PUT -> "URL_GENRES/:id", should return status code 200, res.body.name === genreUpdate.name', async () => {
  const genreUpdate = {
    name: 'Comedy'
  }
  const res = await request(app)
    .put(`${URL_GENRES}/${genreId}`)
    .send(genreUpdate)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genreUpdate.name)
})

test('DELETE -> "URL_GENRES/:id", should return status code 204', async () => {
  const res = await request(app)
    .delete(`${URL_GENRES}/${genreId}`)
  expect(res.status).toBe(204)
})