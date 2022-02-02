# this is a bare neccessities Dockerfile. If you need advance debugging 
# etc., create one with Visual Studio Community 2022


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["svelte-dotnet-app.csproj", "."]
RUN dotnet restore "./svelte-dotnet-app.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "svelte-dotnet-app.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "svelte-dotnet-app.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=publish /app/publish ./
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "svelte-dotnet-app.dll"]