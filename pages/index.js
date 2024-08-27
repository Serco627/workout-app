import { exercises } from "@/lib/exercises";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <header>
        <h1>GymLog</h1>
        <h2>Your ultimate Fitness plattform</h2>
      </header>
      <main>
        {exercises.map((exercise) => {
          return (
            <li key={exercise.id}>
              {exercise.name}
              <Image src={exercise.imageUrl} width={200} height={200} />
              {exercise.muscleGroups.map((muscle) => {
                return <p>{muscle}</p>;
              })}
            </li>
          );
        })}
      </main>
    </>
  );
}
