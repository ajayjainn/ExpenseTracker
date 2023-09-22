# Expense Tracker

Expense Tracker is a web app that lets you manage all your expenses with a chart that segregates your expenses category-wise.
It was built using React.js and Redux with Material UI on the frontend. Node.js with Express.js was used to build the backend. MongoDB was used for database.

Demo: https://expense-tracker-vir4.onrender.com

![image](https://github.com/ajayjainn/expense_tracker/assets/64261776/00eaac80-e0be-4673-bf30-255fbbc6ca3a)

![image](https://github.com/ajayjainn/expense_tracker/assets/64261776/8634ac8b-4ab1-4ceb-97a0-4f7f7485619b)



## Features

- Login and Register
- Add category to each expense
- Displays chart that shows your expenses category-wise
- Lets you add and delete categories
- Update and delete your past expense

## Usage

### Env Variables

Create a .env file in server and add the following

```
PORT = 5000
MONGODB_URI = your mongodb uri
SECRET = 'abc123'
```

### Install Dependencies

```
cd backend
npm install
```

### Run

```
cd backend
npm run dev
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
