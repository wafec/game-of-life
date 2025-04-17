"use client";
import useGameStore from "@/store/useGameStore";

export default function GameInfo() {
  const { population, generation } = useGameStore();
  return (
    <>
      <div data-testid='population-text'>Population: {population}</div>
      <div data-testid='generation-text'>Generation: {generation}</div>
    </>
  );
}
