"use client";
import useGameStore from "@/store/useGameStore";

export default function GameInfo() {
  const { population, generation } = useGameStore();
  return (
    <>
      <div>Population: {population}</div>
      <div>Generation: {generation}</div>
    </>
  );
}
