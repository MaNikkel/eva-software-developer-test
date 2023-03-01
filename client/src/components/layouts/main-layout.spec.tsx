import { render } from '@testing-library/react'
import { MainLayout } from './main'

describe('MainLayout', () => {
  const setup = () => {
    const renderResult = render(<MainLayout>Dummy</MainLayout>)

    const content = renderResult.getByText(/dummy/i)

    return {
      ...renderResult,
      content,
    }
  }

  it('should render correctly', async () => {
    const { content } = setup()

    expect(content).toBeInTheDocument()
  })
})
