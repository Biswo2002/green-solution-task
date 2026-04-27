export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}
export interface Ground {
  id: string;
  name: string;
  features: string[];
  groundCapacity: number;
  slotDurationMinutes: number;
  surfaceTypes: string[];
  venueTypes: string[];
}

export interface Host {
  id: string;
  name: string;
  profilePicture: string;
}

export interface Metrics {
  joinedPlayersCount: number;
  totalPlayersIncludingHost: number;
  remainingSpots: number;
  hasStarted: boolean;
}

export interface Sport {
  id: string;
  name: string;
  icon: string | null;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  city: string;
  isActive: boolean;
  isMaintenance: boolean;
  createdAt: string;
  updatedAt: string;
  geoId: string;
  availabilityHoursId: string;
}

export interface Game {
  id: string;
  accessType: string;
  chatEnabled: boolean;
  createdAt: string;
  date: string; // ISO date string
  startTime: string; // e.g., "16:24"
  durationMinutes: number;
  ground: Ground;
  host: Host;
  instructions: string;
  joiningFee: number;
  lastJoinTime: string;
  level: string;
  maxPlayers: number;
  metrics: Metrics;
  participants: any[];
  sport: Sport;
  sportId: string;
  status: string;
  venue: Venue;
  message?: string;
}
export // Narrow type for just what we use
type GameBookingItem = {
    accessType?: string;
    bookingId?: string;
    durationMinutes?: number;
    gameId?: string;
    going?: {
        capacity?: number;
        current?: number;
    };
    groundCapacity?: number;
    host?: {
        id?: string;
        name?: string;
        profilePictureUrl?: string | null;
    };
    joiningFee?: number;
    metrics?: {
        hasStarted?: boolean;
        joinedPlayersCount?: number;
        remainingSpots?: number;
        totalPlayersIncludingHost?: number;
    };
    orderedAt?: string;
    paymentStatus?: 'Paid' | 'Unpaid' | 'Pending' | string;
    sport?: {
        id?: string;
        name?: string;
        icon?: string | null;
    };
    startAt?: string; // ISO
    startTime?: string; // "15:00"
    status?: string; // "Scheduled" etc.
    totalAmount?: number;
    venue?: {
        id?: string;
        name?: string;
        location?: string;
        city?: string;
    };
};