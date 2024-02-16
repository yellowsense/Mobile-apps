import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

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
          remoteMessage,
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

export async function onDisplayNotification() {
  // Request permissions (required for iOS)
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'notification_sound', // Use the correct channel ID
      name: 'service_app',
      sound: {
        uri: 'notification', // Use the correct sound URI
      },
      importance: AndroidImportance.HIGH,
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
      title: 'You Got New Customer',
      body: 'Please Confirm Your Order',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        actions: [acceptAction, rejectAction],
      },
    });

    // // Play notification sound
    // notificationSound.play();

    // Handle action press events
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
        }
      }
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

export async function sendNotificationToCustomer(mobileNumber, action) {
  try {
    // Construct the notification payload
    const notificationPayload = {
      mobile_number: mobileNumber,
      action: action,
    };

    // Send the notification using the backend API
    const response = await fetch(
      'https://backendapiyellowsense.azurewebsites.net/send_notification_from_serviceprovider',
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
      console.log('Notification sent to the customer successfully!');
      console.log('Notification Response:', responseBody);
    } else {
      console.error(
        'Error sending notification to the customer. Server returned:',
        response.status,
      );
    }
  } catch (error) {
    console.error('Error sending notification to the customer:', error);
  }
}

export async function sendNotificationToCustomerAboutLocation(mobileNumber) {
  try {
    const LocationPayload = {
      customer_mobile_number: mobileNumber,
    };

    const response = await fetch(
      'https://backendapiyellowsense.azurewebsites.net/send_notification_to_customer_about_reached_update',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LocationPayload),
      },
    );

    if (response.ok) {
      const responseBody = await response.json();
      console.log(
        'Notification sent to the customer About Location successfully!',
      );
      console.log('Notification Response:', responseBody);
    } else {
      console.error(
        'Error sending notification to the customer About Location. Server returned:',
        response.status,
      );
    }
  } catch (error) {
    console.error(
      'Error sending notification to the customer About Location:',
      error,
    );
  }
}

export async function statusUpdationAboutWork(mobileNumber) {
  try {
    const completedPayload = {
      customer_mobile_number: mobileNumber,
    };
    const response = await fetch(
      'https://backendapiyellowsense.azurewebsites.net/send_notification_to_customer_about_completed_update',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completedPayload),
      },
    );

    if (response.ok) {
      const responseBody = await response.json();
      console.log('Notification sent to the customer About completed task');
      console.log('Notification Response:', responseBody);
    } else {
      console.error(
        'Error sending notification to the customer About completed task. Server returned:',
        response.status,
      );
    }
  } catch (error) {
    console.error(
      'Error sending notification to the customer About completed task:',
      error,
    );
  }
}
