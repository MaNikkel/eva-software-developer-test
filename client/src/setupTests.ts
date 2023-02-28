import '@testing-library/jest-dom/extend-expect'

import { mockServer } from './mocks/msw/server'

beforeAll(() => {
  mockServer.listen()
})

afterAll(() => {
  mockServer.close()
})

afterEach(() => {
  mockServer.resetHandlers()
})
