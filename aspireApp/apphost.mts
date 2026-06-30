// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { createBuilder } from './.aspire/modules/aspire.mjs';

const builder = await createBuilder();

const api = await builder
    .addUvicornApp('api', '../fastapi-backend', 'main:app')
    .withUv()
    .withHttpEndpoint({
        port: 8010,
    })
    // .withReference(db)
    .withExternalHttpEndpoints();

await builder
    .addViteApp('frontend', '../frontend/app')
    .withReference(api)
    .waitFor(api);

// Add your resources here, for example:
// const redis = await builder.addContainer("cache", "redis:latest");
// const postgres = await builder.addPostgres("db");

await builder.build().run();