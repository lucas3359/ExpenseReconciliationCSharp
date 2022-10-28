FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["ExpenseReconciliation.csproj", "ExpenseReconciliation/"]
RUN dotnet restore "ExpenseReconciliation/ExpenseReconciliation.csproj"
WORKDIR "/src/ExpenseReconciliation"
COPY . .
RUN dotnet build "ExpenseReconciliation.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ExpenseReconciliation.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /src/ExpenseReconciliation/run.sh /app/run.sh
COPY --from=publish /app/publish .
RUN chmod +x /app/run.sh
ENTRYPOINT ["/app/run.sh"]
