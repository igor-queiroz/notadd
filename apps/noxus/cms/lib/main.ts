import { NestFactory } from '@nestjs/core';
import { CmsModule } from './cms.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
const options: {
    url: string,
    port: number,
    magnusPort: number
} = {
    url: 'localhost:3010',
    port: 9000,
    magnusPort: 9000,
    ...process.env as any
}
export async function bootstrap() {
    const app = await NestFactory.create(CmsModule, { bodyParser: false });
    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            url: options.url,
            package: 'noxus',
            protoPath: `${__dirname}/main.proto`
        }
    })
    await app.startAllMicroservicesAsync();
    await app.listen(options.port);
}
bootstrap();
