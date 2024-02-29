### PiktApp - Eurekalabs challenge - Developed by Daniel Comes

### Demo's link
https://drive.google.com/file/d/1wPoXCMYqS8xjuI9PTtIbGFuAYG5TdrRr/view

What is showed in the demo
1. App Loading: The application displays a loading screen upon startup to indicate that it is initializing.
2. Home Page with No Images: If no images have been taken, the home page displays a message informing the user that there are currently no images saved.
3. Button Message on Home Page: The button on the home page is labeled "Take a Picture", indicating to the user that they can start capturing images.
4. Navigation to Camera Screen: Users can navigate from the home page to the camera screen to capture images by pressing a button.
5. Camera Usage - Image Taken and Saved: After capturing an image using the camera, users have the option to save it by pressing the appropriate button.
6. Camera Usage - Image Discarded: Users also have the option to discard the captured image and retake it if needed.
7. Camera Usage - Image Taken and Saved: Users can capture and save multiple images using the camera functionality.
8. Home Page CTA Button Message: Once at least one image has been saved, the button message on the home page changes to "Take More Pictures", indicating that the user can capture additional images.
9. Navigation to Image Details: Users can navigate from the home page to view the details of a specific image.
10. Image and Location Data Displayed: When viewing an image, users can see both the image itself and any associated location data.
11. Same as 10
12. Delete Image Functionality: Users can delete images directly from the application, removing them from the gallery.
13. Same as 12
14. Button Message on Home Page: If there are no images in the camera roll, the button on the home page returns to displaying "Take a Picture," prompting users to capture new images.

---

### Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Usage](#usage)

---

### Description

This project is a mobile application aimed at facilitating the process of taking pictures and managing them. It allows users to take pictures using their device's camera, save them to a designated album, and view them in a gallery-like interface. Additionally, users can delete saved pictures, view picture details such as location metadata, and configure app permissions.

The application leverages technologies such as React Native for cross-platform development, React Navigation for navigation management, React Native Vision Camera for camera integration, AsyncStorage for local data storage. The project aims to provide a user-friendly experience for managing pictures efficiently on mobile devices.

The use of TypeScript ensures type safety throughout the development process, while Zustand provides a simple and efficient state management solution.

---

### Features

1. Camera Integration: Utilizes React Native Vision Camera to enable users to take pictures using their device's camera.
2. Picture Saving: Allows users to save taken pictures to a designated album on their device.
3. Gallery View: Displays saved pictures in a gallery-like interface for easy browsing.
4. Picture Details: Provides users with the ability to view picture details, including location metadata.
5. Picture Deletion: Enables users to delete saved pictures directly from the application.
6. Permissions Management: Guides users to manage app permissions, such as camera and location access, for seamless functionality.
7. Splash Screen: Displays a splash screen upon app launch for branding and loading indication.
8. Navigation: Implements navigation using React Navigation to ensure smooth transitions between screens.
9. Zustand: Implements state management to keep data through all the app flow

---

### Technologies

- React Native
- TypeScript
- React Navigation
- React Native Vision Camera
- React Native Camera Roll
- AsyncStorage
- Zustand

---

### Installation

1. Clone the repository:

2. Navigate to the project directory:

   ```bash
   cd project_name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

### Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Please have in mind that for camera usage you need a physical device.

---
