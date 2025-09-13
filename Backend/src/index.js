import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

const PORT = 4000;

const allowedOrigin = ["https//:localhost:3000", "http//:localhost:3000"];

mongoConnect().then(() => {

    app.on("error", (error) => {
        new Error("App.js Didn't Start. :(");
        throw new error;
    })

    app.listen(PORT, () => { console.log("Welcome To One Stop Couselling Server, Serving AT PORT 4000.") });

}
)
.catch((err) => {
    console.log("Mongo-DB Connection Failed :(");
    throw err;
})


app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(origin, " Not Allowed In CORS"));
        }
    }, credentials: true
}))

app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

import authRouter from "./routes/authRouter.js"
import mongoConnect from "./mongo/mongoose.connect.js";

app.use("/auth", authRouter)


app.get("/", (req, res) => { res.send("Server Found!") })

