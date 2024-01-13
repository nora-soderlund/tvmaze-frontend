# tvmaze-frontend

Live demo @ https://e2cb9a26.tvmaze-frontend.pages.dev

## Getting started

1. `npm install`
2. `npm start`

### Running tests w/ coverage
`npm test`

## "Journey"

I begun with writing the TV MAZE API implementation using my take on a clean architecture setup in TypeScript. I went with a TvInformation data source that acts as a generic layer between the frontend and the data source, which would allow for a much easier transition in the event that the data source would be changed in the future.

After I had the API implementation sketched out, I added the react-router-dom package and started sketching out the initial designs of the entire application. I focused on putting together an user experience that is shared in both desktops and mobile devices, while still remaining quite transparent, as to not have two differing experiences for the same application in the same stack - considering the tiny project.

I topped the index page off by adding a featured show list. 

With more time on my hands, I would've:
- Begun refactoring the components into smaller and a bit more detailed uses.
- Added Storybook for said components to make a better distinction between the user experience and the user interface.
- Placed the featured show logic in a backend.
- Added more show information to the /shows/{showId} page.
- Added a proper manifest and document metadata.
- Finished adding around 100% test coverage, or at least exhaustive unit tests.
