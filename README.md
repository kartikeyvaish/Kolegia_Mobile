# Kolegia

<p align="center">
  <img width="500" src="https://i.imgur.com/8NsQdLA.png" />
</p>

Kolegia is a platform where users can post their lost items and find them. Users can also sell their items by posting them.

## Features

- Users can post their lost items and other users can help them find it.
- Users can also sell something, by posting it on the platform.
- If a user requires something, they can post a requirement for that.
- Directly chat with the seller of the product for buying any item.
- If someone wants to raise a hand on a lost item, they can easily do that.
- Light/Dark Mode support.

## Android APK Download link

The link to the .apk file for the application can be found [here](https://expo.dev/artifacts/eas/3HfyrcvBwDg2SVatsp8v4B.apk)

## Tech Stack

- React Native
- Node.js
- MongoDB
- Firebase

## ✨ App Preview

<p align="center">
  <img src="https://i.imgur.com/diC3koE.png" width="100%" />
</p>

##  Dark Theme

<p align="center">
  <img src="https://i.imgur.com/wIBS9gU.png" width="100%" />
</p>

## Team Members

- Kartikey Vaish 2019-BCS-078
- Kislay Singh 2019-BCS-030
- Vivek Sherkhane 2019-BCS-049

## Development Setup

To set up Kolegia for development, you need to follow the steps mentioned below:

### Step 1: Install Node.js from the [Node.js official website](https://nodejs.org/en/).

During the developement process, I used node version `v16.13.0`. You can check your node version by running the following command:

```shell
node -v
```

### Step 2: Setup [React Native](https://reactnative.dev/docs/environment-setup) environment.

Follow the steps mentioned in the official documentation to setup the environment.

### Step 3: Clone the repository

    git clone https://github.com/kartikeyvaish/Kolegia_Mobile

### Step 4: Install dependencies

    cd Kolegia_Mobile

    npm install

### Step 5: Create a `.env` file for environment variables

You'll have to create a `.env` file for environment variables with the variables listed [here](https://github.com/kartikeyvaish/Kolegia_Mobile/blob/main/README.md#env-file)

### Step 6: Running the application

Connect a physical device or an emulator to your computer. You can read more about connecting to a
physical device or emulator [here](https://reactnative.dev/docs/running-on-device).

After this process is completed, just run

    npm run android

## Environemnt Variables

```dosini
application_name="Kolegia"
application_tag_line="Find . Buy . Sell"
default_profile_picture=""

mode="development"
DEV_BASE_URL=""
PROD_BASE_URL=""
api_version=""

auth_route=""
requirements_route=""
raisedhands_route=""
chats_route=""
otp_route=""
buysell_route=""
lostfound_route=""

googleClientID=""

JWT_Key=""

default_channel_id=""
```
