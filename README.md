# Day One

Today I focused on integrating Mapbox with React. I successfully set up the Mapbox component and configured it to display a map.

Tomorrow, my plan is to implement the draw component, allowing users to draw, modify, and delete polygons.

# Day Two

Still figuring out my approach to this. Was looking into a lot of React Mapbox and React Mapbox draw. A lot of the documentation seems to be out of date will probably circle around and take a different approach.

# Day Three

- Drawing Controls: Provides controls for drawing polygons and deleting drawn features.
- Event Handling: Implements callback functions to handle drawing events, such as creation, deletion, and updates.
- Customizable Configuration: Allows for customization of drawing options and map configurations.
- State Management: Uses React hooks to manage the state of map drawings.

# Day Four

- I broke the form out of the Map.tsx component and made it its own component. After that I used Material UI to start designing the form. As of right now, it seems like, as per the instructions, all functionality is working. I still want to do testing and touch up a few things and make a few things better before submitting the project as finished. In the past, I have used Tailwind, Bootstrap, Semantic UI, and Prime React to put together projects. I have used Material UI on a few occasions and really wanted to work with it more. I kind of like the way I have it set up right now, although there is always room for improvement.

- In the DrawingForm.tsx component I fixed the jsdoc that I had in there. I was thinking in JavaScript when I wrote that originally and had to fix it.

- There were a few unused variables and imports that I had to remove.

# Day Five

- Map Style Functionality: Implemented the ability for users to switch between different map styles, enhancing the visual experience and customization options.

- Component Testing: Added comprehensive testing for all components, ensuring reliability and identifying potential issues early in the development process.

- Error Handling: Fixed an issue related to missing environment variables, preventing errors and providing a more stable user experience.

- Responsive Design: Made significant improvements to the application's responsiveness, ensuring it remains usable and visually appealing on devices with smaller screens down to 320px wide.

- Optimized Functionality: Utilized the useCallback hook to optimize performance by preventing unnecessary function re-renders, enhancing the efficiency of the DrawingForm component.

## Usage

- Clone Repository: Clone the repository to your local machine.
- Install Dependencies: Use npm install to install dependencies.
- Set Up Environment Variable: Define the required environment variable REACT_APP_API_KEY with your Mapbox access token.
- Run Application: Start the application using npm start.
- Access Application: Access the application in your browser at http://localhost:3000.

## Resources

- [Mapbox API Reference](https://www.npmjs.com/package/react-map-gl)
- [Mapbox Draw](https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Material UI](https://mui.com/material-ui/)

Feel free to check out the links above for more information on the tools and libraries I used.
