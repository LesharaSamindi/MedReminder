# MediReminder

<p align="center">
  <img src="assets/branding/medireminder-compact.png" alt="MediReminder logo" width="400" />
</p>

<p align="center">
  <strong>Your medicine, on time.</strong>
</p>

## Application overview

**MediReminder** is a React Native mobile application developed with Expo for the CSI2114 Mobile Application Development Sprint 1 assessment. It helps users organise personal medicine schedules by displaying medicine information, reminder times, medicine status, and reminder preferences in a simple mobile interface.

This Sprint 1 prototype uses local demonstration data and React state management. Newly added medicine information is retained only for the current application session.

> **Disclaimer:** MediReminder is an academic prototype. Its demonstration data is not medical advice. Always follow guidance from a qualified healthcare professional.

## Target domain

Healthcare / Personal Medication Management

## Target users

MediReminder is intended for people who take medicine regularly and need a simple way to organise their personal medicine schedules.

## Problem statement

People who take multiple medicines may find it difficult to remember:

- Which medicine should be taken
- When a medicine should be taken
- Whether a medicine has already been taken
- Which reminder is coming next

Managing several schedules manually can become confusing and increase the chance of missing a planned dose.

## Proposed solution

MediReminder provides one place where users can:

- View a medicine list and medicine details
- Check reminder times and schedule previews
- View Taken or Pending medicine status
- Mark a medicine as Taken or Pending
- Enable or disable medicine reminders
- Add a medicine for the current application session
- Manage basic reminder preferences

## Sprint 1 features

- Expo-based React Native application
- Android and web development scripts
- Native-stack screen navigation
- Prototype login screen
- Home dashboard with daily progress
- Next medicine reminder card
- Medicine list rendered with React Native `FlatList`
- 12 local demonstration medicine records
- Medicine detail and settings screens
- Add Medicine form with validation
- Date and time picker components
- Once-daily, twice-daily, every-six-hours, and custom frequencies
- Generated schedule preview
- Local device notifications through Expo Notifications
- Reusable UI components and shared design constants
- MediReminder branding and splash-screen configuration

## Application screens

### Login

The prototype login screen contains username and password inputs, a password visibility control, and a Login button. It accepts any non-empty username and password because this Sprint 1 version does not use a backend authentication service.

### Home

The Home screen displays application branding, today's medicine progress, the next pending reminder, medicine status, reminder status, Settings access, and an Add Medicine button. The medicine list uses React Native's `FlatList` component.

### Medicine Detail

The Medicine Detail screen displays the selected medicine's name, type, instructions, start date, frequency, reminder schedule, reminder setting, and current status. A user can switch the status between Taken and Pending.

### Add Medicine

The Add Medicine screen supports medicine name, type, instructions, start date, frequency, reminder time, reminder state, custom times, validation, and schedule preview. A successfully submitted medicine is added to Home for the current application session.

### Settings

The Settings screen contains medicine-reminder, sound, and default-reminder preferences together with application information.

## Technologies

- React 19
- React Native 0.81
- Expo SDK 54
- JavaScript and JSX
- React Navigation 7
- Expo Notifications
- Expo Splash Screen
- React Native Community DateTimePicker
- Expo Vector Icons

See [`package.json`](package.json) for the complete dependency list and exact versions.

## Project structure

```text
MediReminder/
|-- assets/
|   |-- branding/
|   `-- images/
|-- screenshots/
|-- src/
|   |-- components/
|   |-- constants/
|   |-- data/
|   |-- navigation/
|   |-- screens/
|   |-- services/
|   `-- utils/
|-- App.js
|-- index.js
|-- app.json
|-- package.json
|-- package-lock.json
`-- README.md
```

## Installation and setup

### Prerequisites

- Node.js LTS
- npm
- Git
- Expo Go on an Android device, or an Android emulator

### 1. Clone the repository

```bash
git clone https://github.com/LesharaSamindi/MedReminder.git
cd MedReminder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Expo development server

```bash
npm start
```

### 4. Open the application

- Scan the displayed QR code with Expo Go, or
- Press `a` in the Expo terminal to open an available Android emulator.

The project also provides these commands:

```bash
npm run android
npm run web
```

## Navigation flow

```text
Login
  `-- Home
      |-- Medicine Detail
      |-- Add Medicine
      `-- Settings
```

## Local data and state management

The demonstration medicine dataset is stored in [`src/data/medicines.js`](src/data/medicines.js) and contains 12 records. Each record is rendered with the reusable `MedicineCard` component.

The prototype uses React's `useState` hook for data such as:

- The current medicine list
- Taken and Pending status
- Reminder switches
- Add Medicine form values and validation errors
- Date, time, frequency, and custom schedule values
- Login form values
- Settings preferences

Because there is no persistent database, state created during use may reset when the application restarts.

## Screenshots

<table>
  <tr>
    <td align="center">
      <strong>Login</strong><br />
      <img src="screenshots/login.png" alt="MediReminder prototype login screen" width="300" />
    </td>
    <td align="center">
      <strong>Home dashboard</strong><br />
      <img src="screenshots/home-dashboard.png" alt="MediReminder Home dashboard with progress and next reminder" width="300" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Home medicine list</strong><br />
      <img src="screenshots/home-medicine-list.png" alt="MediReminder Home screen showing the complete local medicine list" width="300" />
    </td>
    <td align="center">
      <strong>Settings</strong><br />
      <img src="screenshots/settings.png" alt="MediReminder notification and preference settings" width="300" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Add Medicine — once daily</strong><br />
      <img src="screenshots/add-medicine-once-daily.png" alt="Add Medicine form configured for a once-daily reminder" width="300" />
    </td>
    <td align="center">
      <strong>Add Medicine — twice daily</strong><br />
      <img src="screenshots/add-medicine-twice-daily.png" alt="Add Medicine form with two daily reminder times and schedule preview" width="300" />
    </td>
  </tr>
</table>

These captures cover Login, Home, Add Medicine, and Settings. A Medicine Detail capture can be added separately for a complete screen set.

## Sprint 1 requirement mapping

| Assessment requirement | MediReminder implementation |
| --- | --- |
| Working React Native application | React Native with Expo |
| Android support | Expo Go or Android emulator |
| Minimum three screens | Login, Home, Detail, Add Medicine, and Settings |
| Navigation | React Navigation native stack |
| `FlatList` | Medicine list on Home |
| Minimum 10 local items | 12 demonstration medicine records |
| React state | Multiple `useState` hooks across screens |
| Real-world problem | Personal medicine schedule organisation |
| Reusable components | Cards, badges, buttons, selectors, and picker fields |
| Setup documentation | Included in this README |

## Current limitations

- No real user authentication
- No persistent local or cloud database
- No backend API
- No edit or delete medicine workflow
- No medicine history
- No multi-device synchronisation
- Settings are not persisted between application sessions

## Future improvements

- User registration and secure authentication
- Persistent local storage or cloud database integration
- Edit and delete medicine functionality
- Medicine adherence history
- Advanced reminder management
- Multi-device synchronisation
- Accessibility and automated testing improvements

## Submission checklist

- **Module:** CSI2114 Mobile Application Development
- **Assessment:** Sprint 1 Prototype

## Version

MediReminder Sprint 1 Prototype — `1.0.0`
