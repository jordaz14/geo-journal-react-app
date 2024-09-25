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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneEntry = exports.getEntry = exports.insertEntry = exports.getUser = exports.insertUser = exports.getLocationId = exports.getEntryId = exports.getFirstEntryId = exports.updateNewEntry = exports.updateFirstEntry = exports.getUserLocations = exports.insertLocationId = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
/* INSERT NEW LOCATION ID ON LOCATION CREATION */
const insertLocationId = (locationId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase
        .from("location_ids")
        .insert({ location_id: locationId });
    if (error) {
        console.error(error);
    }
    else {
        console.log("Location Id Inserted.");
    }
});
exports.insertLocationId = insertLocationId;
const getUserLocations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.rpc("get_user_location_entries", {
        p_user_id: userId,
    });
    if (error) {
        console.error(error);
    }
    else {
        return data;
    }
});
exports.getUserLocations = getUserLocations;
/* Update locations table to insert all data pertaining to first entry */
const updateFirstEntry = (locationTableId, userId, entryId, coords) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase
        .from("location_ids")
        .update({
        location_lat: coords.lat,
        location_lng: coords.lng,
        owner_id: userId,
        first_entry_id: entryId,
        new_entry_id: entryId,
    })
        .eq("id", locationTableId);
    if (error) {
        console.error(error);
    }
    else {
        console.log("First Entry Updated");
    }
});
exports.updateFirstEntry = updateFirstEntry;
const updateNewEntry = (locationTableId, entryId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase
        .from("location_ids")
        .update({ new_entry_id: entryId })
        .eq("id", locationTableId);
    if (error) {
        console.error(error);
    }
    else {
        console.log("New Entry Updated");
    }
});
exports.updateNewEntry = updateNewEntry;
/* GET ID OF FIRST ENTRY TO CHECK IF NEW ENTRY = FIRST ENTRY*/
const getFirstEntryId = (locationTableId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("location_ids")
        .select("first_entry_id")
        .eq("id", locationTableId);
    if (error) {
        console.error(error);
    }
    else {
        return data;
    }
});
exports.getFirstEntryId = getFirstEntryId;
/* GET ENTRY ID FOR RECENT ENTRY TO UPDATE LOCATION FOREIGN KEYS */
const getEntryId = (locationTableId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("entries")
        .select("entry_id")
        .order("created_at", { ascending: false })
        .eq("location_id", locationTableId)
        .eq("user_id", userId)
        .limit(1);
    if (error) {
        console.error(error);
    }
    else {
        return data;
    }
});
exports.getEntryId = getEntryId;
/* GET LOCATION ID FOR ENTRIES FOREIGN KEY */
const getLocationId = (locationId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("location_ids")
        .select("*")
        .eq("location_id", locationId);
    if (error) {
        console.error(error);
    }
    else {
        return data;
    }
});
exports.getLocationId = getLocationId;
/* INSERT USER ON ACCOUNT REGISTRATION */
const insertUser = (username, email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase
        .from("users")
        .insert({ username: username, email: email, password: hashedPassword });
    if (error) {
        console.error(error);
    }
    else {
        console.log("Account Created");
    }
});
exports.insertUser = insertUser;
/* GET USER DATA BASED ON ATTRIBUTE PARAMETER */
const getUser = (userAttributeName, userAttributeValue) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("users")
        .select("*")
        .eq(userAttributeName, userAttributeValue);
    if (error) {
        console.error(error);
    }
    else {
        return data;
    }
});
exports.getUser = getUser;
/* INSERT ENTRY FOR USER WITH LOCATION ID & MESSAGE */
const insertEntry = (userId, locationId, message) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase.from("entries").insert({
        user_id: userId,
        location_id: locationId,
        message: message,
    });
    if (error) {
        console.error();
    }
    else {
        console.log("Entry inserted");
    }
});
exports.insertEntry = insertEntry;
/* GET ENTRY FOR GIVEN LOCATION */
const getEntry = (locationTableId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("entries")
        .select("created_at, user:users (username), message, location:location_ids!location_id (location_lat, location_lng)")
        .eq("location_id", locationTableId);
    if (error) {
        console.error(error);
    }
    else {
        return data;
    }
});
exports.getEntry = getEntry;
/* GET ENTRY FOR ONE LOCATION FOR ENTRY VALIDATION */
const getOneEntry = (locationTableId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase
        .from("entries")
        .select("*")
        .limit(1)
        .eq("location_id", locationTableId);
    if (error) {
        console.error();
    }
    else {
        return data;
    }
});
exports.getOneEntry = getOneEntry;
