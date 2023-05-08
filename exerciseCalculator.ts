interface Report {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseArgs {
    target: number,
    days: Array<number>
}

const ratingTable: { [key: string]: string } = {
    "1": "bad",
    "2": "not too bad but could be better",
    "3": "good"
};

const calculateExercise = (times: Array<number>, goal: number): Report => {
    const periodLength = times.length;
    const trainingDays = times.reduce(
        (accumulator, currentValue) => {
            if (currentValue !== 0) {
                accumulator += 1;
            }
            return accumulator;
        },
        0);
    const totalHours = times.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
    const average = totalHours / periodLength;
    let rating: number;
    if (Math.abs(average - goal) <= 0.5) {
        rating = 2;
    } else if ((average - goal) > 0.5) {
        rating = 3;
    } else {
        rating = 1;
    }
    const success = average > goal;
    return {
        periodLength, trainingDays, rating, success,
        ratingDescription: ratingTable[rating], target: goal,
        average
    };
};

const parseExerciseArguments = (args: Array<string>): ExerciseArgs => {
    if (args.length < 4) {
        throw new Error("Days not enough.");
    }
    const days = args.splice(2);
    const numberDays = days.map(a => {
        if (isNaN(Number(a))) {
            throw new Error(`Invalid day number: ${a}`);
        }
        return Number(a);
    });
    return {
        target: numberDays[0],
        days: numberDays.splice(1)
    };
};

try {
    const {target, days} = parseExerciseArguments(process.argv);
    console.log(calculateExercise(days, target));
} catch (err: unknown) {
    let errMsg = "Error: ";
    if (err instanceof Error) {
        errMsg += err.message;
    }
    console.error(errMsg);
}

const exerciseMain = (target: number, days: Array<number>) => {
    return calculateExercise(days, target);
};

export {exerciseMain};

