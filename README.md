# 🌍 WorldWise

WorldWise is a travel tracking application built with React. It helps users manage visited cities, explore locations on an interactive map, and keep their travel memories organized.

## 📁 Project Structure

- **`src/components/`** — Reusable UI components, such as the map, forms, city lists, and country lists.
- **`src/pages/`** — Main application pages, including the homepage, login, pricing, and application layout.
- **`src/contexts/`** — Manages and shares city data and authentication state across components.
- **`src/hooks/`** — Contains reusable logic, such as geolocation and URL coordinate management.
- **`data/cities.json`** — Initial city data used by JSON Server.
- **`public/`** — Stores public assets, such as images and logos.

## ⚛️ React Concepts Used

- **Components:** Divide the user interface into small, reusable parts.
- **Props:** Pass data from one component to another.
- **State & `useState`:** Store data that can change and update the user interface.
- **Context API:** Share city data and user information across components without passing props through every level.
- **`useReducer`:** Manage complex state changes using actions and a reducer function.
- **`useEffect`:** Handle side effects, such as fetching data from an API.
- **`useCallback`:** Preserve a function reference between renders when necessary.
- **Custom Hooks:** Extract reusable logic, such as geolocation and URL coordinate management.
- **React Router:** Manage pages, nested routes, URL parameters, and protected routes.
- **`lazy` & `Suspense`:** Load certain pages on demand and display a fallback UI while they load.
- **Controlled Components:** Manage form inputs using React state.
- **`StrictMode`:** Help identify potential problems during development.

## 🗺️ Main Features

- Add and delete visited cities.
- View city details and explore visited countries.
- Save travel dates and personal notes.
- Explore locations using an interactive map.
- Select locations by clicking on the map.
- Detect the user's geographical location.
- Retrieve city and country information from geographical coordinates.
- Log in and access protected application pages.
- Display loading and error states.

## 🛠️ Technologies

React · React Router · Context API · React Leaflet · Leaflet · Vite · JSON Server · CSS Modules
