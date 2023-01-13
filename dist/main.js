"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const server_config_1 = require("./config/server.config");
async function bootstrap() {
    common_1.Logger.log('env', JSON.stringify(process.env));
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix('api', {
        exclude: [{ path: '/App-HealthCheck', method: common_1.RequestMethod.GET }]
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: process.env.CORS_ORIGINS.split(','),
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const svConfig = app.get(server_config_1.default.KEY);
    await app.listen(svConfig.port);
    common_1.Logger.log(`Business service (bs) - protection is starting and listening at http://localhost:${svConfig.port}`);
}
(() => bootstrap())();
//# sourceMappingURL=main.js.map