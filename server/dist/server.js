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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const supabase_1 = require("./utils/supabase");
const authMiddleware_1 = require("./middleware/authMiddleware");
const jwt_1 = require("./utils/jwt");
var cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
dotenv.config();
let clientUrl;
if (process.env.CODE_ENV === "production") {
    clientUrl = "https://nearhere.netlify.app";
}
else {
    clientUrl = "http://localhost:5173";
}
/* 3RD-PARTY MIDDLEWARE */
app.use(cookieParser());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: clientUrl, credentials: true }));
app.get("/", (req, res) => {
    res.send({ message: "Server is running." });
});
/* HANDLE LOCATION CREATION */
app.post("/create-location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Receive UUID from client
    const { locationId } = req.body;
    (0, supabase_1.insertLocationId)(locationId);
    res.send({ message: "A new location was created!", locationId: locationId });
}));
/* HANDLE LOCATION DISPLAY */
app.get("/location/:locationId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { locationId } = req.params;
    // Check if location exists
    const locationIdData = (yield (0, supabase_1.getLocationId)(locationId));
    if (locationIdData.length == 0) {
        return res.send({ isLocation: false });
    }
    // If exists, get location id
    const locationTableId = locationIdData[0].id;
    // Check if location entries exist
    const locationEntries = (yield (0, supabase_1.getEntry)(locationTableId));
    if (locationEntries.length == 0) {
        return res.send({ isLocation: true, isEntry: false });
    }
    res.send({ isLocation: true, isEntry: true, entry: locationEntries });
}));
/* RETURN LOCATIONS PERTAINING TO SPECIFIC USER */
app.get("/user-location", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const userDataByEmail = (yield (0, supabase_1.getUser)("email", req.user.email));
        const userId = userDataByEmail[0].id;
        const userLocationData = (yield (0, supabase_1.getUserLocations)(userId));
        res.send(userLocationData);
    }
}));
/* HANDLE USER REGISTRATION */
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirmPassword } = req.body;
    // VALIDATE INPUTS ON SERVER-SIDE
    // Check all inputs fulfilled
    if (!username || !email || !password || !confirmPassword) {
        res.send({ message: "Invalid username or password" });
        return;
    }
    // Check for matching passwords
    if (password != confirmPassword) {
        res.send({ message: "Passwords do not match" });
        return;
    }
    // Check for unique username
    const userDataByUsername = yield (0, supabase_1.getUser)("username", username);
    if ((userDataByUsername === null || userDataByUsername === void 0 ? void 0 : userDataByUsername.length) != 0) {
        res.send({ message: "Username already exists." });
        return;
    }
    // Check for unique email
    const userDataByEmail = yield (0, supabase_1.getUser)("email", email);
    if ((userDataByEmail === null || userDataByEmail === void 0 ? void 0 : userDataByEmail.length) != 0) {
        res.send({ message: "Email already exists." });
        return;
    }
    // CREATE THE ACCOUNT
    // Hash submitted password
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    // Insert submitted user into database
    (0, supabase_1.insertUser)(username, email, hashedPassword);
    res.send({
        message: "Account Created! Click here to login",
        isRegistered: true,
    });
}));
/* HANDLE USER AUTH (INITIAL CLIENT LOAD) */
app.get("/auth", authMiddleware_1.authenticateJWT, (req, res) => {
    console.log("auth attempting");
    if (req.user) {
        res.json({ authenticated: true, user: req.user });
    }
    else {
        res.json({ authenticated: false, user: req.user });
    }
});
/* HANDLE USER LOGIN */
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //TO DO: Login Server-Side Validation
    // Get user data for user submitted email
    const userData = (yield (0, supabase_1.getUser)("email", email));
    // Check if user exists, return if not
    if ((userData === null || userData === void 0 ? void 0 : userData.length) == 0) {
        res.send({ message: "Incorrect email or password." });
        return;
    }
    // Check if user submitted password matches hashed password
    const isPasswordMatch = yield bcrypt_1.default.compare(password, userData[0].password);
    if (isPasswordMatch) {
        const token = (0, jwt_1.generateToken)(email);
        // Create http cookie with 1hr expiration
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.CODE_ENV === "production",
            sameSite: "none",
            maxAge: 3600000,
        });
        // Decode token to send user email, init time, and exp time
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_SECRET);
        return res.send({
            message: "Yay, Logged In",
            isLoggedIn: true,
            user: decoded,
        });
    }
    // Catch if passwords do not match
    else {
        return res.send({
            message: "Incorrect email or password.",
            isLoggedIn: false,
        });
    }
}));
/* HANDLE USER LOGOUT */
app.post("/logout", (req, res) => {
    // Clear http cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.send({ message: "Logged Out" });
});
/* HANDLE USER ENTRY CREATION */
app.post("/entry/:locationId", authMiddleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { locationId } = req.params;
    const { coords, formData } = req.body;
    let userId = null;
    let entryId = null;
    // TO DO: Validate form input
    // TO DO: Update location coords on first entry, owner id on first entry, first_entry_id on first entry, and new_entry_id on every entry
    // Get foreign key id for location
    const locationIdData = (yield (0, supabase_1.getLocationId)(locationId));
    const locationTableId = locationIdData[0].id;
    if (req.user) {
        // Check if user is logged in
        // Get foreign key id for user
        const userDataByEmail = (yield (0, supabase_1.getUser)("email", req.user.email));
        userId = userDataByEmail[0].id;
        // Add to 'entry' table
        yield (0, supabase_1.insertEntry)(userId, locationTableId, formData.message);
        // Get entry id from recent entry
        entryId = (yield (0, supabase_1.getEntryId)(locationTableId, userId));
        entryId = entryId[0].entry_id;
        yield (0, supabase_1.updateNewEntry)(locationTableId, entryId);
        res.send({ message: "User entry added" });
    }
    // If not, handle as a guest
    else {
        // Get foreign key id for guest
        const userDataByUsername = (yield (0, supabase_1.getUser)("username", "Guest"));
        userId = userDataByUsername[0].id;
        // Add to 'entry' table
        yield (0, supabase_1.insertEntry)(userId, locationTableId, formData.message);
        // Get entry id from recent entry
        entryId = (yield (0, supabase_1.getEntryId)(locationTableId, userId));
        entryId = entryId[0].entry_id;
        yield (0, supabase_1.updateNewEntry)(locationTableId, entryId);
        res.send({ message: "Guest entry added" });
    }
    let firstEntryData = (yield (0, supabase_1.getFirstEntryId)(locationTableId));
    let firstEntryId = firstEntryData[0].first_entry_id;
    // If no first entry id
    if (!firstEntryId) {
        (0, supabase_1.updateFirstEntry)(locationTableId, userId, entryId, coords);
    }
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
