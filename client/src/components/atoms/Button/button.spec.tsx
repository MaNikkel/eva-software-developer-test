import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

describe('Button', () => {
  const mockClick = jest.fn()

  const setup = () => {
    const renderResult = render(<Button onClick={mockClick}>Salvar</Button>)

    const button = renderResult.getByRole('button', { name: /salvar/i })

    return {
      ...renderResult,
      button,
    }
  }

  it('should render correctly', async () => {
    const { button } = setup()

    expect(button).toBeInTheDocument()
  })

  it('should perform action on Click', async () => {
    const { button } = setup()

    userEvent.click(button)

    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
