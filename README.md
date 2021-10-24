# Todo Application (Full stack)


### Requirements

I run this with the following:

Node 8.16.x

npm 6.14.x

Postgres 10.x

Note:
You also need to configure your database user on your system and put the correct
details in your .env before running the db:create command


### Quick start

TL;DR: just the commands

```sh
# terminal one
git clone git@github.com:kmrakash/todo_full_stack.git
cd todo_full_stack
cp .env.example .env
npm i
npx sequelize-cli db:create # see note above. You must have a valid user in your .env file
npx sequelize-cli db:migrate
npm start
# terminal two (from previous directory)
cd client
npm i
npm start
```

Once the project has been initialised, you may find it more useful to use the `npm run dev` command from the root folder, which will spin up the server and client concurrently.
