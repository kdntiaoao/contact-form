import { render, RenderResult, screen } from '@testing-library/react'

import { PrimaryButton } from '.'

describe('PrimaryButton', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<PrimaryButton backgroundColor="primary">Button</PrimaryButton>)
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('render button', () => {
    const element = screen.getByRole('button', { name: 'Button' }) as HTMLButtonElement
    expect(element).toBeInTheDocument()
  })
})
