import { Hono } from 'hono'
import { userRouter } from './routers/user'
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono()

app.get("/", (c) => {
   return c.json({
      message: "Welcome to the Globakery API",
     version: "1.0.0",
   });
});
app.route("/api/user", userRouter)


app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})
app.get('/ui', swaggerUI({ url: '/doc' }))

export default {
  port: 8080,
  fetch: app.fetch,
}
