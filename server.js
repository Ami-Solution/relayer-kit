const jsonServer = require("json-server");
const path = require("path");

// NOTE: This should change to the network that you're wanting to deploy against.
const network = process.env.NETWORK || "local";

const server = jsonServer.create();

// The database we "connect" to should depend on the network we're deploying for.
const db = `db-${network}.json`;

const router = jsonServer.router(`data/${db}`);

const middlewares = jsonServer.defaults({
    static: path.join(__dirname, "build"),
});

server.use(middlewares);

/**
 * An example function to show how we might add fees, given some data about the loan.
 *
 * @param loanData
 */
const getFee = (loanData) => {
   const principalAmount = parseFloat(loanData.principalAmount);

   if (!principalAmount) {
       return 0;
   }

    // In this example we return a fee of 5% of the principal amount, rounded down to 2 decimals.
    const feePercent = 5;
    const totalFee = (principalAmount / 100) * feePercent;
    return totalFee.toFixed(2);
};

server.use(jsonServer.bodyParser);

// The client can request a relayer fee for some given loan data.
server.get("/relayerFee", (req, res) => res.json({ fee: getFee(req.query) }));

// Add a "createdAt" field for each new LoanRequest.
server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }

    // Continue to JSON Server router
    next();
});

server.use(router);
server.listen(process.env.PORT || 8000, () => {
    console.log(`JSON Server is running for ${network} blockchain`);
});