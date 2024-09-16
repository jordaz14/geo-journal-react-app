import { METHODS } from "http";
import { supabase } from "../server";

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
