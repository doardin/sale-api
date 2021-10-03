import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes"
import ExceptionHandler from "@shared/exceptions/ExceptionHandler";
import '@shared/typeorm';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error : Error, request : Request, response : Response, next : NextFunction) => {
    if(error instanceof ExceptionHandler){
        return response.status(error.statusCode).json({
            status : error.statusCode,
            message : error.message
        });
    }

    return response.status(500).json({
        status : 500,
        message : "Internal Server Error"
    })
});

app.listen(5000, () => {
    console.log("🚀 SERVER START ON PORT 5000 🚀");
})