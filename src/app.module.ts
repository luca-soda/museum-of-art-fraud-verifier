import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetaverseIdentityController } from './metaverse-identity/metaverse-identity.controller';
import { MetaverseIdentityService } from './metaverse-identity/metaverse-identity.service';
import { WellKnownController } from './well-known/well-known.controller';

@Module({
  imports: [],
  controllers: [AppController, MetaverseIdentityController, WellKnownController],
  providers: [AppService, MetaverseIdentityService],
})
export class AppModule {}
