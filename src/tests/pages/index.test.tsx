/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import Index from '@/pages/index'

describe('Index page', () => {
  test('Index page renders without crashing', () => {
    const { getByTestId } = render(<Index />)
    const index = getByTestId('index')
    expect(index).toBeDefined()
  })

  test('Index page loads header and content components', () => {
    const { getByTestId } = render(<Index />)
    const header = getByTestId('header')
    const content = getByTestId('content')
    expect(header).toBeDefined()
    expect(content).toBeDefined()
  })
})
