const IS_BROWSER = typeof window !== 'undefined'

export const setupMocks = async () => {
  if (IS_BROWSER) {
    const { mockWorker } = await import('./worker')
    mockWorker.start()
  } else {
    const { mockServer } = await import('./server')
    mockServer.listen()
  }
}
