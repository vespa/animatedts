import { screen } from '@testing-library/react';
import { AnimatedSpriteNavByArrows } from './AnimatedSpriteNavByArrows';
import { renderWithProviders } from "__mocks/utils"
import mainSprite from "static/sprites/jetpack_sprite.png";
// import { DirectionsNavigateKeys } from 'state/action-types';
const testId = "myId"
const args = {
    id: testId,
    running: true,
    defaultPos: 5,
    width: 73,
    height: 120,
    toLeft: [8, 9],
    toRight: [10, 11],
    toBottom: [6, 5, 7],
    toTop: [13, 12, 14],
    sprite: mainSprite,
}

describe("check position changes", () => {
    it('renders without crash on DOWN state', async () => {
        renderWithProviders(<AnimatedSpriteNavByArrows {...args} />);
        expect(screen.getByTestId(testId).style.width).toBe(`${args.width}px`)
        expect(screen.getByTestId(testId).style.height).toBe(`${args.height}px`)
        // default pos
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-365px')
    });

})

