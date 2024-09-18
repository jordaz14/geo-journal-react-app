import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
const SUPABASE_KEY: string = process.env.SUPABASE_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const insertLocationId = async (locationId: string) => {
  const { data, error } = await supabase
    .from("location_ids")
    .insert({ location_id: locationId });

  if (error) {
    console.error(error);
  } else {
    console.log("Location Id Inserted.");
  }
};

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

export const insertUser = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const { data, error } = await supabase
    .from("users")
    .insert({ username: username, email: email, password: hashedPassword });

  if (error) {
    console.error(error);
  } else {
    console.log("Account Created");
  }
};

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

export const insertEntry = async (
  userId: number,
  locationId: string,
  message: string
) => {
  const { data, error } = await supabase
    .from("entries")
    .insert({ user_id: userId, location_id: locationId, message: message });

  if (error) {
    console.error();
  } else {
    console.log("Entry inserted");
  }
};

export const getEntry = async (locationTableId: number) => {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("location_id", locationTableId);

  if (error) {
    console.error();
  } else {
    return data;
  }
};
