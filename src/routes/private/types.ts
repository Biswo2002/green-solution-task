import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Private } from '../../screens';
import { PublicNavigationProps } from '../public/types';

export type BottomTabsTypes = {
  Feeds: undefined;
};

export type GymClassSelection = {
  id: string;
  title: string;
  pricePerMonth: number;
  scheduleLabel: string;
};

type PrivateScreens = {
  [key in keyof typeof Private]: undefined;
};

type OmittedScreens =
  | 'OpenMatchesLanding'
  | 'GymListeningDetails'
  | 'ChooseMembershipType'
  | 'GymMembership'
  | 'GymSelectClasses'
  | 'GymCheckout'
  | 'GymBookingSuccessful'
  | 'MyGymMembershipDetails'
  | 'BookingSuccessful'
  | 'VenueListingsDetails'
  | 'VenueBookingSlots'
  | 'MyGame'
  | 'DiscoverPeoples'
  | 'VerifyProfileOtp'
  | 'VenueListings'
  | 'BookingDetails'
  | 'InvitePreview'
  | 'PublicGamePreview'
  | 'AllPlayers'
  | 'PopularVenuesList'
  | 'TournamentDetails'
  | 'TournamentCategories'
  | 'TournamentParticipants'
  | 'TournamentTeams'
  | 'TournamentBookingSummary'
  | 'TournamentPlayerProfile'
  | 'MyTournaments'
  | 'MyTournamentDetails';

export type PrivateNavigationProp = Omit<PrivateScreens, OmittedScreens> & {
  GymListeningDetails:
    | {
        gymId?: string;
      }
    | undefined;
  ChooseMembershipType:
    | {
        gymId?: string;
      }
    | undefined;
  GymMembership:
    | {
        gymId?: string;
        gymName?: string;
        selectedMembershipTypeId?: string;
      }
    | undefined;
  GymSelectClasses:
    | {
        gymId: string;
        gymName?: string;
        gymLocation?: string;
        gymImage?: string;
        planId: string;
        planName?: string;
        durationValue?: number;
        durationUnit?: string;
        baseAmount?: number;
        gstPercent?: number;
        membershipTypeId?: string;
        membershipTypeLabel?: string;
      }
    | undefined;
  GymCheckout:
    | {
        gymId: string;
        gymName?: string;
        gymLocation?: string;
        gymImage?: string;
        planId: string;
        planName?: string;
        durationValue?: number;
        durationUnit?: string;
        baseAmount?: number;
        gstPercent?: number;
        membershipTypeId?: string;
        membershipTypeLabel?: string;
        selectedClasses?: GymClassSelection[];
      }
    | undefined;
  GymBookingSuccessful:
    | {
        subscriptionId?: string;
        paymentId?: string;
        membershipTypeLabel?: string;
        selectedClasses?: GymClassSelection[];
      }
    | undefined;
  MyGymMembershipDetails:
    | {
        subscriptionId?: string;
        membershipTypeLabel?: string;
        selectedClasses?: GymClassSelection[];
      }
    | undefined;
  OpenMatchesLanding: {
    gameId: any;
    isOpenMatches?: boolean;
  };
  BookingSuccessful: {
    isComingFromQuickMatch?: boolean;
    orderId: string;
    isGameSuccess: boolean;
    isPrivateGameSuccessful?: boolean;
    /**
     * When true, the booking API has returned a pending status
     * and the UI should show the "payment pending" state instead
     * of a full success message.
     */
    isPaymentPending?: boolean;
    /**
     * Optional preloaded booking/game data used when the booking API
     * is not available. When provided, the success screen will
     * render from this object instead of fetching by orderId.
     */
    preloadedBooking?: any;
    /**
     * Optional route the user came from, used to drive dynamic "back" navigation.
     * When provided, the success screen will navigate back to this route instead
     * of always resetting to the home tab.
     */
    fromRoute?: keyof PrivateNavigationProp;
    /** Params to pass when navigating back to `fromRoute`. */
    fromParams?: any;
  };
  VenueListingsDetails: {
    lastViewedVenueId: string;
    fromCreateGame?: boolean;
  };
  VenueBookingSlots: {
    venueId: string;
    venueName: string;
    sportId: string;
    sportName: string;
    fromCreateGame?: boolean;
    /** When true, show side count selector (e.g. 5V5, 7V7) and pass sideCount to slot API */
    sideCountHave?: boolean;
    /** Grounds from get venue by id (optional; screen can fetch venue if missing) */
    grounds?: Array<{
      id: string;
      name: string;
      slotDurationMinutes?: number;
      pricePerSlot?: string;
      currency?: string;
      sports?: { id: string; name: string }[];
      venueTypes?: { name: string }[];
      surfaceTypes?: { name: string }[];
      pricingRules?: Array<{
        sportId: string;
        pricePerHour: string;
        currency?: string;
        band?: string;
        sideCount?: number | null;
      }>;
    }>;
  };
  MyGame: {
    gameId: string;
    isMyGame: boolean;
    isPrivateGame?: boolean;
    joinedViaPrivateAndAccepted?: boolean;
  };
  InvitePreview: {
    token?: string;
  };
  PublicGamePreview: {
    gameId?: string;
  };
  DiscoverPeoples: {
    gameId: string;
  };
  VerifyProfileOtp: {
    phoneNumber: any;
    otp?: string;
    ttlMs?: number;
    fromVenueDetails?: boolean;
  };
  VenueListings: {
    isWishList?: boolean;
    fromCreateGame?: boolean;
  };
  BookingDetails: {
    bookingId: string;
  };
  AllPlayers: {
    players?: any[];
    hostId?: string;
    title?: string;
    gameLevel?: string;
    gameId?: string;
  };
  PopularVenuesList: undefined;
  TournamentDetails: {
    tournamentId?: string;
  };
  TournamentCategories: {
    tournamentId?: string;
  };
  TournamentParticipants: {
    tournamentId?: string;
    categoryId?: string;
  };
  TournamentTeams: {
    tournamentId?: string;
    categoryId?: string;
  };
  TournamentBookingSummary: {
    tournamentId?: string;
    categoryId?: string;
  };
  TournamentPlayerProfile: {
    playerId?: string;
  };
  MyTournaments: undefined;
  MyTournamentDetails: {
    bookingId?: string;
  };
};

export type PrivateRoutesTypes = {
  // TabLayout: undefined;
  TabLayout: {
    screen?: 'MainLanding' | 'Bookings' | 'QuickMatches' | 'Profile';
  };
} & PrivateNavigationProp;
// export type PrivateRoutesTypes = {
//   BottomTab: undefined;
// } & PrivateNavigationProp;

export type PrivateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;

export type AllScreensParamList = PublicNavigationProps & PrivateScreenProps;
