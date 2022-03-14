import React from "react"
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import App from './App'
import Board from './Board/Board'

describe('App', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState])
  act(() => {
    render(<Board winHandler={(setTo: boolean) => {setWin(setTo)}} />)
  })
  it('renders learn react link', () => {
    render(<App />)
    const titleElement = screen.getByText(/light/i);
    expect(titleElement).toBeInTheDocument();
  })
})
