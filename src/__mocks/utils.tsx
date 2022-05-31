import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from "state";

export const renderWithProviders = (
    ui: ReactElement
) => {
    return render(<Provider store={store}>{ui}</Provider>);
};

export const wait = async (time: number) => await new Promise((r) => setTimeout(r, time));

