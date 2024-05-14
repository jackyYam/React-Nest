# React-Nest

## Frontend

The front end is writeen in React with TypeScript, it uses [shadcn](https://ui.shadcn.com/) and [tailwind](https://tailwindcss.com/) for components styling.

For running the sever:

```
cd front
npm install
npm run start
```

The requested page can be found in `http://localhost:3000/info-form`, you can find a swith on that page that enables/disables the frontend form validation.

Also dark-mode is implmented for the application (It's activated by default, so it doesn't burn your eyes 😎)

## Backend

The requested endpoint can be find at `/info/complete-info-validate`, it uses [zod](https://zod.dev/) to provide Object schema validation, this brings the advantage of unifying schema with front and back, accelarating the develpment process.

I implemented status code 400 for this endpoint so it's clearer when there is error.

You can find a simple Postman documentation [here](https://documenter.getpostman.com/view/26969282/2sA3JQ4f6t) to check the sample response and the body required.
