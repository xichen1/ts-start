type Operation = "multiply" | "add" | "divide";
type Result = number | string;

const multiplication = (a: number, b: number, op: Operation): Result => {
    if (op === "multiply") {
        return a * b;
    } else if (op === "add") {
        return a + b;
    } else if (op == "divide") {
        if (b === 0) return "this cannot be done";
        return a / b;
    } else {
        return "error";
    }
};

multiplication(2, 3, "add");
console.log(process.argv);

export {Operation, multiplication};