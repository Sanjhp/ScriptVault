# ScriptVault

## Getting Started

To get started with ScriptVault, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies in the flixxit folder and backend folder using `npm install`.
3. Set up the necessary environment variables for third-party services.

## Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/ScriptVault.git
```

Replace your-username with your GitHub username.

## Usage

To run ScriptVault locally, use the following command in root directory:

```bash
npm start
```

Access the application in your web browser at `http://localhost:3000`.

## Technologies Used

ScriptVault is built using the following technologies:

- React
- Node.js
- Express.js
- MongoDB
- Stripe API
- Axios
- HTML/CSS
- JavaScript

## Test Credentials:

user@gmail.com
Password: 123456

## Note

The application uses the Alpha Vantage free tier, which has a limitation of only 100 API calls per day. As a result, the Explore and Detail sections may not display data if the limit is reached.

If the Explore section of the application does not have any data available, clicking the "Buy" button may result in a server error (HTTP 500). Users should be informed that they need to ensure that the Explore section has data before attempting to make a purchase.

In Dashboard, it is used for fetching latest prices , dur to the limit responses Some data may not be available, and you may experience a 100% loss.
