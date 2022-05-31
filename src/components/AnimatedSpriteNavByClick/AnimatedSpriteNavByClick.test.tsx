import { screen } from '@testing-library/react';
import { AnimatedSpriteNavByClick } from './AnimatedSpriteNavByClick';
import { renderWithProviders } from "__mocks/utils"
import mainSprite from "static/sprites/jetpack_sprite.png";

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
        renderWithProviders(<AnimatedSpriteNavByClick {...args} />);
        expect(screen.getByTestId(testId).style.width).toBe(`${args.width}px`)
        expect(screen.getByTestId(testId).style.height).toBe(`${args.height}px`)
        // default pos
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-365px')
    });

})

