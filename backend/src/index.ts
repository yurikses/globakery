import { Hono } from 'hono'
import { userRouter } from './routers/user'

const app = new Hono()

app.get("/", (c) => {
   return c.json({
      message: "Welcome to the Globakery API",
     version: "1.0.0",
   });
});
app.route("/api/user", userRouter)

export default app
