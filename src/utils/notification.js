import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const notificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('================Token==========');
  console.log(token);
  console.log('================Token==========');
};

export async function onDisplayNotification(payload) {
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'notification', // Use the sound name without file extension
    });

    // Create actions for the notification
    const acceptAction = {
      title: 'Accept',
      pressAction: {
        id: 'accept_action',
      },
    };

    const rejectAction = {
      title: 'Reject',
      pressAction: {
        id: 'reject_action',
      },
    };

    // Display a notification with accept and reject actions
    await notifee.displayNotification({
      title: payload?.notification?.title || 'You Got New Customer',
      body: payload?.notification?.body || 'Please Confirm Your Order',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        actions: [acceptAction, rejectAction],
      },
    });

    notifee.onForegroundEvent(async ({type, detail}) => {
      if (type === 'press') {
        const {notification, pressAction} = detail;

        if (pressAction) {
          switch (pressAction.id) {
            case 'accept_action':
              // Handle accept action press
              console.log('Accept action pressed');
              break;
            case 'reject_action':
              // Handle reject action press
              console.log('Reject action pressed');
              break;
            default:
              break;
          }
        } else if (notification) {
          // Handle notification press (when no action is provided)
          console.log('Notification pressed:', notification);
        }
      }
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

export async function sendNotificationToServiceProvider(mobileNumber) {
  try {
    // Construct the notification payload
    const notificationPayload = {
      mobile_number: mobileNumber,
    };

    // Send the notification using the backend API
    const response = await fetch(
      'https://backendapiyellowsense.azurewebsites.net/send_notification_from_customer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationPayload),
      },
    );

    if (response.ok) {
      const responseBody = await response.json();
      console.log('Notification sent to the service provider successfully!');
      console.log('Notification Response:', responseBody);
    } else {
      console.error(
        'Error sending notification to the service provider. Server returned:',
        response.status,
      );
    }
  } catch (error) {
    console.error('Error sending notification to the service provider:', error);
  }
}
