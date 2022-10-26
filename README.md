# Chat app (Firebase)
Realtime chat app based on Firebase. A user can chat with multiple persons in one-on-one chat.

## Features
- Realtime chat
- Google account sign-in
- Google account based user info

## Structure
.
├── components
│   ├── Login.js
│   └── Sidebar.js
├── firebaseconfig.js
├── LICENSE
├── next.config.js
├── package.json
├── pages
│   ├── api
│   │   └── hello.js
│   ├── _app.js
│   ├── chat
│   │   └── [id].js
│   └── index.js
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── README.md
├── styles
│   └── globals.css
├── utils
│   ├── getCurrentUserChats.js
│   └── getOtherEmail.js
└── yarn.lock
