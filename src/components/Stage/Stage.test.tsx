import React from 'react';
import { render, screen } from '@testing-library/react';
import Stage from './Stage';
import { Provider } from 'react-redux'
import { store } from "state";

describe("Check render properties", () => {

    it('renders child', () => {
        render(<Provider store={store}><Stage size={{ width: 200, height: 200 }}> <span> stage </span></Stage></Provider>);
        const element = screen.getByText(/stage/i);
        expect(element).toBeInTheDocument();
    });

    it('renders stage with expected size', () => {
        render(<Provider store={store}><Stage size={{ width: 200, height: 200 }}> <> stage </></Stage></Provider>);
        const element = screen.getByText(/stage/i);
        expect(element.style.height).toBe("200px")
        expect(element.style.width).toBe("200px")
    });
})
