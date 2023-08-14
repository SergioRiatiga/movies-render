const request = require('supertest')
const app = require('../app')

const URL_ACTORS = '/api/v1/actors'
let actorId

const actor = {
  firstName: 'Will',
  lastName: 'Smith',
  nationality: 'United States',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/800px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg',
  birthday: '1968-09-25'
}

test('POST -> "URL_ACTORS", should return status code 201, res.body.firstName === actor.firstName', async() => {
  const res = await request(app)
    .post(URL_ACTORS)
    .send(actor)
  actorId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test('GET -> "URL_ACTORS", should return status code 200, res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_ACTORS)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('GET ONE -> "URL_ACTORS/:id", should return status code 200, res.body.firstName === actor.firstName', async () => {
  const res = await request(app)
    .get(`${URL_ACTORS}/${actorId}`)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test('PUT -> "URL_ACTORS/:id", should retun status code 200, res.body.firstName === actorUpdate.firstName', async () => {
  const actorUpdate = {
    firstName: 'Jaden'
  }
  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send(actorUpdate)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)
})

test('DELETE -> "URL_ACTORS/:id", should return status code 204', async () => {
  const res = await request(app)
    .delete(`${URL_ACTORS}/${actorId}`)
  expect(res.status).toBe(204)
})