interface bmiArgs {
    numHei: number,
    numWei: number
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal range";
    } else {
        return "Overweight";
    }
};

const parseBmiArgs = (weight: string, height: string): bmiArgs => {
    if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
        return {
            numHei: Number(height),
            numWei: Number(weight)
        };
    } else {
        throw new Error("invalid height/weight type");
    }
};


const bmiMain = (weight: string, height: string): string => {
    const {numWei, numHei} = parseBmiArgs(weight, height);
    return calculateBmi(numHei, numWei);
};

export {parseBmiArgs, bmiMain};