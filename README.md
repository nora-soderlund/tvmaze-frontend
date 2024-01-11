# tvmaze-frontend
I begun with writing the TV MAZE API implementation using my take on a clean architecture setup in TypeScript. I went with a TvInformation data source that acts as a generic layer between the frontend and the data source, which would allow for a much easier transition in the event that the data source would be changed in the future.

After I had the API implementation sketched out, I added the react-router-dom package and started sketching out the initial designs of the entire application. I focused on putting together an user experience that is shared in both desktops and mobile devices, while still remaining quite transparent, as to not have two differing experiences for the same application in the same stack - considering the tiny project.
