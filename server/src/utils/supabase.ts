import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
const SUPABASE_KEY: string = process.env.SUPABASE_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* INSERT NEW LOCATION ID ON LOCATION CREATION */
export const insertLocationId = async (locationId: string) => {
  const { error } = await supabase
    .from("location_ids")
    .insert({ location_id: locationId });

  if (error) {
    console.error(error);
  } else {
    console.log("Location Id Inserted.");
  }
};

export const getUserLocations = async (userId: number) => {
  const { data, error } = await supabase.rpc("get_user_location_entries", {
    p_user_id: userId,
  });

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

/* Update locations table to insert all data pertaining to first entry */
export const updateFirstEntry = async (
  locationTableId: number,
  userId: number,
  entryId: number,
  coords: { lat: number | null; lng: number | null }
) => {
  const { error } = await supabase
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
  } else {
    console.log("First Entry Updated");
  }
};

export const updateNewEntry = async (
  locationTableId: number,
  entryId: number
) => {
  const { error } = await supabase
    .from("location_ids")
    .update({ new_entry_id: entryId })
    .eq("id", locationTableId);

  if (error) {
    console.error(error);
  } else {
    console.log("New Entry Updated");
  }
};

/* GET ID OF FIRST ENTRY TO CHECK IF NEW ENTRY = FIRST ENTRY*/
export const getFirstEntryId = async (locationTableId: number) => {
  const { data, error } = await supabase
    .from("location_ids")
    .select("first_entry_id")
    .eq("id", locationTableId);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

/* GET ENTRY ID FOR RECENT ENTRY TO UPDATE LOCATION FOREIGN KEYS */
export const getEntryId = async (locationTableId: number, userId: number) => {
  const { data, error } = await supabase
    .from("entries")
    .select("entry_id")
    .order("created_at", { ascending: false })
    .eq("location_id", locationTableId)
    .eq("user_id", userId)
    .limit(1);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

/* GET LOCATION ID FOR ENTRIES FOREIGN KEY */
export const getLocationId = async (locationId: string) => {
  const { data, error } = await supabase
    .from("location_ids")
    .select("*")
    .eq("location_id", locationId);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

/* INSERT USER ON ACCOUNT REGISTRATION */
export const insertUser = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const { error } = await supabase
    .from("users")
    .insert({ username: username, email: email, password: hashedPassword });

  if (error) {
    console.error(error);
  } else {
    console.log("Account Created");
  }
};

/* GET USER DATA BASED ON ATTRIBUTE PARAMETER */
export const getUser = async (
  userAttributeName: string,
  userAttributeValue: string
) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq(userAttributeName, userAttributeValue);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

/* INSERT ENTRY FOR USER WITH LOCATION ID & MESSAGE */
export const insertEntry = async (
  userId: number,
  locationId: string,
  message: string
) => {
  const { error } = await supabase.from("entries").insert({
    user_id: userId,
    location_id: locationId,
    message: message,
  });

  if (error) {
    console.error();
  } else {
    console.log("Entry inserted");
  }
};

/* GET ENTRY FOR GIVEN LOCATION */
export const getEntry = async (locationTableId: number) => {
  const { data, error } = await supabase
    .from("entries")
    .select(
      "created_at, user:users (username), message, location:location_ids!location_id (location_lat, location_lng)"
    )
    .eq("location_id", locationTableId);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

/* GET ENTRY FOR ONE LOCATION FOR ENTRY VALIDATION */
export const getOneEntry = async (locationTableId: number) => {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .limit(1)
    .eq("location_id", locationTableId);

  if (error) {
    console.error();
  } else {
    return data;
  }
};
