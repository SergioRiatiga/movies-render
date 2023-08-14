const request = require('supertest')
const app = require('../app')
const Genre = require('../models/Genre')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
require('../models')

const URL_MOVIES = '/api/v1/movies'
let movieId

const movie ={
  name:'El secreto de sus ojos',
  image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/El_secreto_de_sus_ojos_%28pel%C3%ADcula%29_Logo.png',
  synopsis: 'Benjamín Espósito es oficial de un Juzgado de Instrucción de Buenos Aires recién retirado. Obsesionado por un brutal asesinato ocurrido veinticinco años antes, en 1974, decide escribir una novela sobre el caso, del cual fue testigo y protagonista.',
  releaseYear: 2009
}

test('POST -> "URL_MOVIES", should return status code 201, res.body.name === movie.name', async() => {
  const res = await request(app)
    .post(URL_MOVIES)
    .send(movie)
  movieId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test('GET -> "URL_MOVIES", should return status  code 200, res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_MOVIES)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('GET ONE -> "URL_MOVIES/:id", should return status code 200, res.body.name === movie.name', async () => {
  const res = await request(app)
    .get(`${URL_MOVIES}/${movieId}`)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test('PUT -> "URL_MOVIES/:id", should return status code 200, res.body.name === movieUpdate.name', async() => {
  const movieUpdate= {
    name: 'El secreto'
  }
  const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send(movieUpdate)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
})

test('POST -> "URL_MOVIES/:id/genres", should return status code 200, res.body.length === 1', async () => {
  const genre = {
    name:'Suspense'
  }
  const createGenre = await Genre.create(genre)
  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([createGenre.id])
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createGenre.id)
  await createGenre.destroy()
})

test('POST -> "URL_MOVIES/:id/actors", should return status code 200, res.body.length === 1', async () => {
  const actor = {
    firstName: 'Ricardo',
    lastName: 'Darin',
    nationality: 'Argentinian',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Marcozz.jpg',
    birthday: '1957-01-16'
  }
  const createActor = await Actor.create(actor)
  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([createActor.id])
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createActor.id)
  await createActor.destroy()
})

test('POST -> "URL_MOVIES/:id/directors", should return status code 200, res.body.length === 1', async () => {
  const director = {
    firstName: 'Juan',
    lastName: 'Campanella',
    nationality: 'Argentinian',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Juan_Jos%C3%A9_Camapanella_2019.jpg/1280px-Juan_Jos%C3%A9_Camapanella_2019.jpg',
    birthday: '1959-07-19'
  }
  const createDirector = await Director.create(director)
  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([createDirector.id])
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createDirector.id)
  await createDirector.destroy()
})

test('DELETE -> "URL_MOVIES/:id", should return status code 204', async () => {
  const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`)
  expect(res.status).toBe(204)
})

