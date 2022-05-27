import React from 'react';
import { render } from '@testing-library/react';
import Stage from './Stage';
import { Provider } from 'react-redux'
import { store } from "state";

test('renders learn react link', () => {
    render(<Provider store={store}><Stage size={{ width: 200, height: 200 }} > <> ddd </></Stage></Provider>);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});
