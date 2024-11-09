import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Alert, Dimensions, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import apiService from "../utils/ApiService";
import { GOOGLE_MAP_API_KEY } from "../constants/Config";
import { Colors, FontSizes } from "../constants/Config";

const Map = ({ navigation }) => {
  const centerLocation = {
    latitude: 37.7906552,
    longitude: -122.419436,
    latitudeDelta: 0.01,
    longitudeDelta: 0.05,
  };
  const [locations, setLocations] = useState([]);
  const [region, setRegion] = useState(centerLocation);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markerRefs = useRef({});

  useEffect(() => {
    fetchLocations();
  }, []);
  useEffect(() => {
    if (selectedMarker) {
      const markerKey = `${selectedMarker.latitude}-${selectedMarker.longitude}`;
      if (markerRefs.current[markerKey]) {
        markerRefs.current[markerKey].showCallout();
      }
    }
  }, [selectedMarker]);
  const fetchLocations = async () => {
    try {
      const data = await apiService(
        "/locations",
        "GET",
        null,
        null,
        navigation
      );
      console.log("Fetched location data:", data);
      const validLocations = data.filter(
        (location) => location.latitude !== 0 && location.longitude !== 0
      );

      setLocations(validLocations);
    } catch (error) {
      console.log("Failed to fetch locations:", error);
    }
  };

  const handleMarkerPress = (location) => {
    setSelectedMarker((prevMarker) =>
      prevMarker &&
      prevMarker.latitude === location.latitude &&
      prevMarker.longitude === location.longitude
        ? null
        : location
    );
  };
  return (
    <View style={styles.containerStyle}>
      <MapView
        style={styles.mapStyle}
        provider={MapView.PROVIDER_GOOGLE}
        apiKey={GOOGLE_MAP_API_KEY}
        initialRegion={centerLocation}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {locations.map((location, index) => {
          const markerKey = `${location.latitude}-${location.longitude}`;
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.formattedAddress || "Location"}
              pinColor={Colors.primary}
              ref={(ref) => (markerRefs.current[markerKey] = ref)}
              onPress={() => handleMarkerPress(location)}
            >
              <Callout>
                <View style={styles.calloutContainerStyle}>
                  <Text style={styles.calloutTitleStyle}>
                    {selectedMarker &&
                    selectedMarker.latitude === location.latitude &&
                    selectedMarker.longitude === location.longitude
                      ? location.formattedAddress || "No address available"
                      : "Tap for more details"}
                  </Text>
                  {selectedMarker &&
                    selectedMarker.latitude === location.latitude &&
                    selectedMarker.longitude === location.longitude && (
                      <Text style={styles.calloutDescriptionStyle}>
                        Coordinates: {location.latitude}, {location.longitude}
                      </Text>
                    )}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainerStyle: {
    width: 250,
    minHeight: 100,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  calloutTitleStyle: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  calloutDescriptionStyle: {
    fontSize: FontSizes.small,
    color: Colors.primary,
    textAlign: "center",
  },
});

export default Map;
