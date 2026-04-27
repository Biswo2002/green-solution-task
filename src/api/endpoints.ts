export const API_URLS = {
  url: {
    GOOGLE_GEO_REVERSE: 'https://maps.googleapis.com/maps/api/geocode/json',
    OLA_GEO_REVERSE: 'https://api.olamaps.io/places/v1/reverse-geocode',
    auth: {
      v1: {
        signin: '/api/v1/user/login',
        signup: '/api/v1/user/register',
        logout: '/api/v1/user/logout',
        sendOTP: '/api/v1/user/otp/mobile/send',
        verifyOTP: '/api/v1/user/otp/verify',
        ForgotPasswordSendOTP: '/api/v1/user/forgot-password',
        ResetPassword: '/api/v1/user/reset-password',
        ForgotPasswordVerifyOTP: '/api/v1/user/forgot-password/verify-otp',
        refreshToken: '/api/v1/user/refresh-token',
      },
    },
    user: {
      v1: {
        getUserInfoAll: '/api/v1/user',
        updateProfile: '/api/v1/user',
        // getUserById:''
           otp: {
          mobileSend: '/api/v1/user/otp/mobile/send',
          verify: '/api/v1/user/otp/verify',
        },
        logout:'/api/v1/user/logout',
        addFavoriteSports:'/api/v1/user/add-favorite-sports'
      }
    },
    venue: {
      v1: {
        allSports: '/api/v1/admin/sports',
        filters: '/api/v1/venue/filters',
        nearByVenues: '/api/v1/venue/nearby',
        allVenues: '/api/v1/venue',
        mostPopular: '/api/v1/venue/most-popular',
        venuePayment: {
          createBooking: '/api/v1/venue-payment/bookings',
          bookings: '/api/v1/venue-payment/bookings',
          verify: '/api/v1/venue-payment/verify',
          gameVerify:'/api/v1/game-payment/cashfree/verify',
          gameBookings:'/api/v1/game-payment/bookings'
        },
        createVenueRating:"/api/v1/venue/create-ratings",
        getBookingById: '/api/v1/venue/booking',
        getBookingInvoice: '/api/v1/venue/booking',
        
      }
    },
    gym: {
      v1: {
        gyms: '/api/v1/gym-app/gyms',
        gymDetails: '/api/v1/gym-app/gyms',
        gymPlans: '/api/v1/gym-app/gyms',
        myMemberships: '/api/v1/gym-app/my/gym-memberships',
        mySubscriptions: '/api/v1/gym-app/my/gym-subscriptions',
        myPayments: '/api/v1/gym-app/my/gym-payments',
        refreshPaymentStatus: '/api/v1/gym-app/my/gym-payments',
      },
    },
    game: {
      v1: {
        myGames: '/api/v1/game/my-games',
        myJoinedGamesDetails: '/api/v1/game/my-joined-games',
        otherGames:'/api/v1/game/other-games',
        bookedVenue:'/api/v1/game/booked-grounds',
        createGame:'/api/v1/game',
        inviteLinks: '/api/v1/game/invite-links',
        checkMobileNumbers:'/api/v1/game/check-mobile-numbers',
        getInvitations:'/api/v1/game/invitations',
        privateGameDetails:'/api/v1/game/private-other-games',
        booking:{
        upcomingBookings  :"/api/v1/venue/upcoming-bookings",
        pastBooking:'/api/v1/venue/past-bookings',
        }
      }
    },
    service: {
      v1: {
        getServices: 'api/v1/services/servicesSearch/searchCategoryByLocation',
        createService: '/api/v1/service',
        updateService: '/api/v1/service',
        deleteService: '/api/v1/service',
        getHomeProducts: '/api/v1/services/homePage/product',
        getProductsOnSearch: '/api/v1/services/servicesSearch/on_search',
        getHomeSearch: '/api/v1/services/homePage/search',
        getHomeCategory: '/api/v1/services/homePage/category',
        domain: {
          getDomainHomeCategory: '/api/v1/common/domain',
          getCategory: '/api/v1/common/category/',
        },
      },
    },
    notification: {
      v1: {
        getNotification: '/api/v1/common/notification/',
        postNotification: '/api/v1/common/notification/',
        deleteNotification: '/api/v1/common/notification/',
        updateNotification: '/api/v1/common/notification/',
      },
    },
    common: {
      v1: {
        privacyPolicy: '/api/v1/admin/privacy-policy',
        termsAndConditions: '/api/v1/admin/terms-and-conditions',
        banner: '/api/v1/banner/active',
      },
    },
  },
};
