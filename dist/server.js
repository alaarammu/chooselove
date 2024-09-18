"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module
const express_1 = __importDefault(require("express"));
const airtable_1 = __importDefault(require("airtable"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './src/.env' });
const baseId = process.env.AIRTABLE_BASE_ID;
const PAT = process.env.AIRTABLE_PAT;
console.log(PAT);
const base = new airtable_1.default({ apiKey: PAT }).base(baseId);
const GRANTEES = "grantees";
const GRANTS = "grants";
const REPORTS = "reports";
// Create an Express application
const app = (0, express_1.default)();
// Set the port number for the server
const port = 3000;
// Define a route for the root path ('/')
app.get('/', (req, res) => {
    // Send a response to the client
    res.send('Hello, TypeScript + Node.js + Express!');
});
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
app.post("/" + GRANTEES, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("POST ", GRANTEES);
    base(GRANTEES).create({
        Field1: 'Value1',
        Field2: 'Value2',
    }).then(record => {
        console.log('Created record:', record);
    }).catch(err => {
        console.error('Error creating record:', err);
    });
}));
app.get("/" + GRANTEES, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Function to fetch all records
        const fetchRecords = () => {
            return new Promise((resolve, reject) => {
                let grantees = [];
                base(GRANTEES).select({
                // Filters or options go here
                }).eachPage((records, fetchNextPage) => {
                    records.forEach(record => {
                        console.log('Retrieved record:', record);
                        grantees.push(record.fields); // Use record.fields to get the data
                    });
                    fetchNextPage();
                }, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(grantees);
                    }
                });
            });
        };
        const grantees = yield fetchRecords();
        return res.status(200).json(grantees);
    }
    catch (error) {
        console.error('Error retrieving records:', error);
        return res.status(500).json({ error: 'Failed to retrieve records' });
    }
}));
//# sourceMappingURL=server.js.map