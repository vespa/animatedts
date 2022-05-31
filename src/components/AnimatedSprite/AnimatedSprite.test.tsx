import { screen, act } from '@testing-library/react';
import { AnimatedSprite } from './AnimatedSprite';
import { renderWithProviders } from "__mocks/utils"
import mainSprite from "static/sprites/jetpack_sprite.png";
import { DirectionsNavigateKeys } from 'state/action-types';
const testId = "myId"
const args = {
    id: testId,
    direction: DirectionsNavigateKeys.DOWN,
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
const wait = async (time: number) => await new Promise((r) => setTimeout(r, time));

const updateArgs = (
    key: string, value: string
) => ({ ...args, [key]: value })
describe("check position changes", () => {
    test('renders without crash on DOWN state', async () => {
        renderWithProviders(<AnimatedSprite {...args} />);
        expect(screen.getByTestId(testId).style.width).toBe(`${args.width}px`)
        expect(screen.getByTestId(testId).style.height).toBe(`${args.height}px`)
        // default pos
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-365px')
    });

    it('renders without crash on UP state', async () => {
        const updatedArgs = updateArgs("direction", DirectionsNavigateKeys.UP)
        renderWithProviders(<AnimatedSprite {...updatedArgs} />);
        await act(async () => {
            await wait(100)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-949px')
    });

    it('renders without crash on LEFT state', async () => {
        const updatedArgs = updateArgs("direction", DirectionsNavigateKeys.LEFT)
        renderWithProviders(<AnimatedSprite {...updatedArgs} />);
        await act(async () => {
            await wait(100)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-584px')
    });

    it('renders without crash on RIGHT state', async () => {
        const updatedArgs = updateArgs("direction", DirectionsNavigateKeys.RIGHT)
        renderWithProviders(<AnimatedSprite {...updatedArgs} />);
        await act(async () => {
            await wait(100)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-730px')
    });

    it('renders without crash on RIGHT state', async () => {
        const updatedArgs = updateArgs("direction", DirectionsNavigateKeys.DOWN)
        renderWithProviders(<AnimatedSprite {...updatedArgs} />);
        await act(async () => {
            await wait(100)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-438px')
    });
    it('renders without crash on STATIC state', async () => {
        const updatedArgs = updateArgs("direction", DirectionsNavigateKeys.STATIC_MOVES)
        renderWithProviders(<AnimatedSprite {...updatedArgs} />);
        await act(async () => {
            await wait(100)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-365px')
    });

})

describe('test object rerender', () => {
    it("update pos", async () => {
        const updatedArgs = updateArgs("direction", DirectionsNavigateKeys.STATIC_MOVES)
        const { rerender } = renderWithProviders(<AnimatedSprite {...updatedArgs} />);
        await act(async () => {
            await wait(100)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-365px')
        const updatedArgs2 = updateArgs("direction", DirectionsNavigateKeys.UP)
        rerender(<AnimatedSprite {...updatedArgs2} />)
        await act(async () => {
            await wait(60)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-949px')
        // should get the second animation position 
        await act(async () => {
            await wait(60)
        })
        expect(screen.getByTestId(testId).querySelector("div")?.style.left).toBe('-876px')
    })
})
