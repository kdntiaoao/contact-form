import React from 'react'

import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PrimaryButton } from '.'

describe('PrimaryButton', () => {
  let renderResult: RenderResult
  let handleClick: jest.Mock

  beforeEach(() => {
    handleClick = jest.fn()
    renderResult = render(
      <PrimaryButton backgroundColor="primary" onClick={handleClick}>
        Button
      </PrimaryButton>
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('render button', () => {
    const element = screen.getByRole('button', { name: 'Button' }) as HTMLButtonElement
    expect(element).toBeInTheDocument()
  })

  it('click button', async () => {
    const element = screen.getByRole('button', { name: 'Button' }) as HTMLButtonElement
    userEvent.click(element)
    await waitFor(() => expect(handleClick).toHaveBeenCalled())
  })
})
