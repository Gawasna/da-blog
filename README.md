# daBlog

Welcome to **daBlog**, a personal blog web project designed to showcase various web development techniques and tools. This project is built using modern web technologies and libraries to create a dynamic and responsive blogging platform.

## Table of Contents

- [daBlog](#dablog)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Responsive Design**: Optimized for various screen sizes.
- **Dynamic Content**: Fetch and display blog posts dynamically.
- **Interactive UI**: Smooth navigation and interactive elements.
- **Social Media Integration**: Links to social media profiles.
- **Customizable**: Easy to modify and extend.

## Technologies Used

- **Frontend**:
    - React: For building the user interface.
    - Swiper: For creating responsive sliders.
    - FontAwesome: For icons.
    - CSS: For styling components.

- **Backend**:
    - Environment Variables: Managed using `.env` file.

- **Build Tools**:
    - Vite: For fast builds and hot module replacement.
    - ESLint: For code linting.

## Project Structure

```
da-blog/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── component/
│   │   ├── layout/
│   │   │   ├── banner/
│   │   │   │   ├── banner.jsx
│   │   │   │   └── banner.css
│   │   │   ├── footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.css
│   │   │   ├── header/
│   │   │   │   └── data.json
│   │   │   └── ftp/
│   │   │       └── posts.js
│   ├── pages/
│   │   └── HomePage/
│   │       ├── HomePage.jsx
│   │       └── HomePage.css
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**:
     ```sh
     git clone https://github.com/yourusername/da-blog.git
     cd da-blog
     ```

2. **Install dependencies**:
     ```sh
     npm install
     ```

3. **Set up environment variables**:
     Create a `.env` file in the root directory and add the following:
     ```env
     REACT_APP_API_URL=http://localhost:3000
     ```

## Usage

1. **Run the development server**:
     ```sh
     npm run dev
     ```

2. **Build for production**:
     ```sh
     npm run build
     ```

3. **Preview the production build**:
     ```sh
     npm run preview
     ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
