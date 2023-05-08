import express, {Request, Response} from "express";
import {parseBmiArgs, bmiMain} from "./bmiCalculator";
import {multiplication, Operation} from "./calculator";
import {exerciseMain} from "./exerciseCalculator";

const app = express();
app.use(express.json());
app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/bmi", (req: Request, res: Response) => {
    const weight = req.query.weight;
    const height = req.query.height;
    if (!(typeof weight === "string") || !(typeof height === "string")) {
        res.sendStatus(400);
    } else {
        try {
            const {numHei, numWei} = parseBmiArgs(weight, height);
            const result = bmiMain(weight, height);
            res.send({
                "weight": numWei,
                "height": numHei,
                "bmi": result
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("unknown error.");
            }
            res.sendStatus(400);
        }
    }
});

app.post("/calculate", (req: Request, res: Response) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {value1, value2, op} = req.body;
    if (!value1 || isNaN(Number(value1))) {
        return res.send({error: "err1"}).status(400);
    }
    if (!value2 || isNaN(Number(value2))) {
        return res.send({error: "err2"}).status(400);
    }
    const result = multiplication(Number(value1), Number(value2), op as Operation);
    return res.send(result);
});

app.post("/exercises", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if (!target || isNaN(Number(target))) {
        return res.send({error: "target error"}).status(400);
    }
    if (!daily_exercises || !Array.isArray(daily_exercises)) {
        return res.send({error: "daily_exercises error"}).status(400);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = exerciseMain(Number(target), daily_exercises);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});