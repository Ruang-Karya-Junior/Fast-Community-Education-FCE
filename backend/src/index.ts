import { Elysia } from "elysia";
import Router from "./Routes/index";
import openapi from "@elysia/openapi";

new Elysia()
  .use(openapi())
  .use(Router)
  .listen(3000);

console.log("🚀 http://localhost:3000");