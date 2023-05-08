interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error("Not enough args");
    if (args.length > 4) throw new Error("Too many args");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error("Provided values were not numbers.");
    }
};

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
};

try {
    const {value1, value2} = parseArguments(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (err: unknown) {
    let errorMsg = "something bad happened.";
    if (err instanceof Error) {
        errorMsg += " Error: " + err.message;
    }
    console.log(errorMsg);
}