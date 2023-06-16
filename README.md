# DealerTrack.VehicleSales.Client

React app dashboard to import vehicle sales and view analytics
This application is protected by Auth0 auth provider.

## HOW TO RUN

1. A .env file is provided separately via email. Put that .env file inside "ClientApp" folder.
2. If you have docker installed locally run the following commands, otherwise move to step 3.
   `docker build . -t vehiclesalesdashboard` -> `docker run -d -p 3000:80 vehiclesalesdashboard`
3. If you donot have docker installed run `dotnet run` at root of project.
4. Navigate to http://localhost:3000 and login/register via Auth0 to gain access to app.
5. Added spectral ops github action
   woifjgope

![image](https://user-images.githubusercontent.com/5270403/122065425-ef2bba00-cdbf-11eb-9099-116b55188746.png)
