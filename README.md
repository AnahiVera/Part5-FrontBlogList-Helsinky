# Blog List Frontend (React + Vite)

This project is a simple blog list application built with React and Vite. It allows users to view, add, like, and delete blogs. The frontend communicates with a backend API (see Part4-BlogsList) for data persistence and user authentication.

## Features
- User authentication (login/logout)
- View a list of blogs
- Add new blogs
- Like blogs (with dynamic sorting by likes)
- Delete blogs (only by the creator)
- Responsive and modern UI

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/Part5-FrontBlogList-Helsinky.git
   cd Part5-FrontBlogList-Helsinky/Part5-FrontBlogList
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - If needed, create a `.env` file for your API base URL or other configs.

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:5173` by default.

### Usage
- Log in with your credentials.
- Add, like, or delete blogs as desired.
- Blogs are sorted by number of likes (ascending/descending toggle).

### Running Tests
To run the frontend tests:
```sh
npm test
# or
yarn test
```

## Backend
This frontend expects a compatible backend API (see `Part4-BlogsList` in this repository or your own backend).

##
 **Testing E2E**: [Repositorio separado](https://github.com/AnahiVera/E2E-testing-Playwright) (ejercicios 5.17-5.22)


<!-- elsLint config,proptypes, use of jwt for log in and local storage for session data saving -->
<!-- testing installing Vitest and the jsdom library simulating a web browser -->