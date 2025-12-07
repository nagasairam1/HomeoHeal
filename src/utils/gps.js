import * as Location from "expo-location";

export async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return { error: "Permission denied" };

  const loc = await Location.getCurrentPositionAsync({});
  return loc.coords;
}
