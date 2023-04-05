# Eat.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Emotion](https://i.ibb.co/2K7MdKW/Screenshot-2023-04-05-231244.png)
![MaterialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)


## About
![design](https://i.ibb.co/q0wSKH9/hero.jpg)
Eat is a web app for groceries delivery.

This is Back-End repository of this app. If you would like see Front-end, click [here](https://github.com/Cloudyaa/EatAppFront).

Live version available [here](https://www.eat.cloudyaa.networkmanager.pl/).

## Try this app

To run this app locally follow this steps:
1. Clone the repository
```
git clone https://github.com/Cloudyaa/EatAppBack.git
```

2. Install dependencies
```
npm i
```

3. Edit database config file:
    - uncomment everything
    - add your configuration
    - change file name to ```config.ts```
   
This is example:
```js
// config/config.ts
  export const config = { 
    dbHost: 'localhost',
    dbUser: 'user',
    dbPassword: 'password',
    dbDatabase: 'database',
    corsOrigin: 'http://localhost:3000',
 };

```

4. Run application
```
npm run start
```

Please note that you will be running only server Backend-End version of this app. To run this app in full version, start Front-End app as well. You can find instruction for that on Front-End repository.

## Future

Incoming improvements and updates:
- admin dashboard to manage products and orders,
- possibility to add delivery address on user record,
- show delivery address on checkout view,
- sending message through contact form (now it doesn't send it anywhere)

