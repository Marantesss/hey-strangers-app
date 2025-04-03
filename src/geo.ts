interface Coordinates {
  latitude: number
  longitude: number
}

/**
 * Calculate the distance between two points using the Haversine formula
 * @returns Distance in kilometers
 */
const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(point2.latitude - point1.latitude)
  const dLon = toRad(point2.longitude - point1.longitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.latitude)) *
      Math.cos(toRad(point2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const toRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}

/**
 * Get coordinates for a city name using OpenStreetMap Nominatim API
 */
const getCityCoordinates = async (
  cityName: string,
): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`,
    )
    const data = await response.json()

    if (data && data[0]) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      }
    }
    return null
  } catch (error) {
    console.error('Error getting city coordinates:', error)
    return null
  }
}

/**
 * Get city name from coordinates using OpenStreetMap Nominatim API
 */
const getCityFromCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    )
    const data = await response.json()
    return data.address.city || data.address.town || data.address.village || null
  } catch (error) {
    console.error('Error getting city from coordinates:', error)
    return null
  }
}

export const geo = {
  calculateDistance,
  getCityCoordinates,
  getCityFromCoordinates,
}
