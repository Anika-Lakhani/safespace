import { CONFIG } from '../utils/constants';

// Generate random coordinates within a radius
const generateRandomLocation = (centerLat, centerLng, radiusKm) => {
  const radiusInDegrees = radiusKm / 111.32; // Approximate conversion
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.sqrt(Math.random()) * radiusInDegrees;
  
  const lat = centerLat + (randomRadius * Math.cos(randomAngle));
  const lng = centerLng + (randomRadius * Math.sin(randomAngle));
  
  return { lat, lng };
};

// Generate mock users with different genders
const generateMockUsers = (userLat, userLng) => {
  const genders = ['female', 'male', 'female', 'male', 'female', 'nonBinary', 'male', 'female'];
  const mockUsers = [];
  
  for (let i = 0; i < CONFIG.mockUsersCount; i++) {
    const location = generateRandomLocation(userLat, userLng, 2); // 2km radius
    mockUsers.push({
      id: `mock_${i + 1}`,
      gender: genders[i],
      lat: location.lat,
      lng: location.lng,
      isOnline: true,
      lastSeen: new Date().toISOString()
    });
  }
  
  return mockUsers;
};

// Get nearby users count (simulate real-time updates)
const getNearbyUsersCount = (userLat, userLng, radius = CONFIG.defaultAlertRadius) => {
  // For now, return a random number between 3-8
  // In real implementation, this would query the database
  return Math.floor(Math.random() * 6) + 3;
};

export const MockDataService = {
  generateMockUsers,
  getNearbyUsersCount
}; 