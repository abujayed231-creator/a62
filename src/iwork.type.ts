

export interface IWork {
    id: number;
    name: string;         // Changed from Number to string (names are usually text)
    image: string;        // Changed from a literal value to a string type
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
}