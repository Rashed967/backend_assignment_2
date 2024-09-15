## টাইটেল

# Basic user and orders management server

## প্রজেক্ট ডিস্ক্রিপশন

এটা একটা ইউসার ম্যানেজমেন্ট সার্ভার সাইড কোডের রিপোজিটোরি। express js ও typescript দিয়ে এটা বানানো হয়েছে। এই সার্ভারের মাধ্যমে ক্লায়েন্ট সাইড থেকে ডাটা রিসিভ করে ডাটাবেজে সংরক্ষণ করা যাবে এবং ডাটা আবার ফেচও করা যাবে। এখানে একজন ইউসারের বেশ কিছু ডাটা পাঠানো যাবে, ইউসারের নাম, ইউনিক ইউসার আইডি যেটা কেবল একজনেরই থাকবে, বয়স, ইমেইল সহ আরও অনেক তথ্য ডাটাবেজে সেভ করা যাবে।

ইউসারের ইউনিক আইডির মাধ্যমে ডাটাবেজ থেকে ইউজারের প্রয়োজনীয় সব তথ্য পাওয়া যাবে। নির্দিষ্ট একজন ইউজারের সব অর্ডারের তথ্য পাওয়া যাবে। নতুন কোনো প্রোডাক্ট কিনলে তা ডাটাবেজে সেইভ হবে। চাইলে যেকোনো তথ্য আপডেট ও ডিলিট করারও অপশন আছে। এডমিন চাইলে যেকোনো ইউসারকে ডিলিটও করে দিতে পারবেন।

টাইপস্ক্রিপ্ট ব্যবহার করায় এতে সব ধরণের এররকে খুব ভালোভাবে হ্যান্ডেল করা হয়েছে। যেকোনো এররের ক্ষেত্রে নির্দিষ্ট এরর কোডের পাশাপাশি সুন্দর ও বোধগম্য মেসেজও ব্যবহার করা হয়েছে।

## ব্যবহার পদ্ধতি

এটাকে ব্যবহার করতে চাইলে আপনার মেশিনে বেশ কিছু লাইব্ররি ও টুল ডিপেন্ডেসি হিসেবে এ্যাড করতে হবে। নীচে আমি সবগুলোর তালিকা দিয়ে দিচ্ছি।

### Install @vercel/node

`npm install @vercel/node@3.0.11`

### Install cors

`npm install cors@2.8.5`

### Install dotenv

`npm install dotenv@16.3.1`

### Install express

`npm install express@4.18.2`

### Install mongodb

`npm install mongodb@6.3.0`

### Install mongoose

`npm install mongoose@8.0.1`

### Install nodemon

`npm install nodemon@3.0.1`

## for dev dependency

### Install @types/bcrypt

`npm install @types/bcrypt@^5.0.2 --save-dev`

### Install @types/cors

`npm install @types/cors@^2.8.17 --save-dev`

### Install @types/express

`npm install @types/express@^4.17.21 --save-dev`

### Install @typescript-eslint/eslint-plugin

`npm install @typescript-eslint/eslint-plugin@^6.12.0 --save-dev`

### Install @typescript-eslint/parser

`npm install @typescript-eslint/parser@^6.12.0 --save-dev`

### Install eslint

`npm install eslint@^8.54.0 --save-dev`

### Install eslint-config-prettier

`npm install eslint-config-prettier@^9.0.0 --save-dev`

### Install prettier

`npm install prettier@^3.1.0 --save-dev`

### Install ts-node-dev

`npm install ts-node-dev@^2.0.0 --save-dev`

### Install typescript

`npm install typescript@^5.3.2 --save-dev`

### Install zod

`npm install zod@^3.22.4 --save-dev`

## কনফিগারেশন

কনফিগারেশনের জন্য আপনার প্রজেক্টে `eslint` এবং `prettier` সেট করা লাগতে পারে। কীভাবে এই দুটো ইনস্টল করা যায় বিস্তারিত জানতে [এই টিউটোরিয়ালটি](https://blog.logrocket.com/linting-typescript-eslint-prettier/) ফলো করুন।

## সকল রাউট সমূহ

`POST /api/users` = এই রাউটের মাধ্যমে ডাটাবেজে নতুন ইউসার তৈরী করা যাবে।

`GET /api/users` = এই রাউটের মাধ্যমে সব ইউসারকে পাওয়া যাবে।

`GET /api/users/:userId` = এই রাউটের মাধ্যমে নির্দিষ্ট একজন ইউসারকে পাওয়া যাবে।

`PUT /api/users/:userId` = এই রাউটের মাধ্যমে নির্দিষ্ট ইউসারের তথ্য আপডেট করা যাবে।

`PUT /api/users/:userId/orders` = এই রাউটের মাধ্যমে নির্দিষ্ট ইউজারের অর্ডার যুক্ত করা যাবে।

`DELETE /api/users/:userId` = এই রাউটের মাধ্যমে নির্দিষ্ট ইউজারকে ডিলিট করা যাবে
