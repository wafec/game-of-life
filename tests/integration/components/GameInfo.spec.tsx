import React from 'react';
import { render, screen } from '@testing-library/react';
import GameInfo from '../../../src/components/GameInfo';

jest.mock("../../../src/store/useGameStore", () => ({
    __esModule: true,
    default: () => ({
        generation: 10,
        population: 20
    })
}))

describe('GameInfo Component', () => {
    it('should render without crashing', () => {
        render(<GameInfo />);
        expect(screen.getByTestId('population-text')).toBeInTheDocument();
        expect(screen.getByTestId('generation-text')).toBeInTheDocument();
    });

    it('should display the population', () => {
        render(<GameInfo />);
        expect(screen.getByTestId('population-text')).toHaveTextContent('Population: 20');
    });

    it('should display the generation count', () => {
        render(<GameInfo />);
        expect(screen.getByTestId('generation-text')).toHaveTextContent("Generation: 10")
    });
});