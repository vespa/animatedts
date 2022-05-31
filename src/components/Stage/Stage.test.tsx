import { screen } from '@testing-library/react';
import Stage from './Stage';
import { renderWithProviders } from "__mocks/utils"

describe("Check render properties", () => {
    it('renders child', () => {
        renderWithProviders(<Stage size={{ width: 200, height: 200 }}> <span> stage </span></Stage>);
        const element = screen.getByText(/stage/i);
        expect(element).toBeInTheDocument();
    });

    it('renders stage with expected size', () => {
        renderWithProviders(<Stage size={{ width: 200, height: 200 }}> <> stage </></Stage>);
        const element = screen.getByText(/stage/i);
        expect(element.style.height).toBe("200px")
        expect(element.style.width).toBe("200px")
    });
})
