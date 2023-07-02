import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req } from '@nestjs/common';
import { MetaverseIdentityService } from './metaverse-identity.service';
import * as dotenv from 'dotenv';
import axios from 'axios';
import * as storage from 'node-persist';

dotenv.config();

@Controller('metaverse-identity')
export class MetaverseIdentityController {

    constructor(private readonly metaverseIdentityService: MetaverseIdentityService) {
        storage.init();
    }

    @Post('/issuance-callback')
    issuanceCallback(@Req() req: any) {
        console.log(req.body);
    }

    @Post('/presentation-callback')
    async presentationCallback(@Body('requestId') requestId: string, @Body('requestStatus') requestStatus: string, @Body('verifiedCredentialsData') credentials?: any[]) {
        let firstName = undefined;
        let lastName = undefined;
        if (credentials) {
            const credential = credentials[0];
            firstName = credential.claims.firstName;
            lastName = credential.claims.lastName;
        }
        await storage.set(requestId, JSON.stringify({
            requestStatus,
            firstName,
            lastName
        }))
    }

    @Get('/presentation-request')
    async presentationRequest() {
        try {
            const accessToken = await this.metaverseIdentityService.getAccessToken();
            const payload = this.metaverseIdentityService.generateVerifierPayload();
            const { data } = await axios.post('https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createPresentationRequest', payload, {
                headers: {
                 'Authorization': `Bearer ${accessToken}`
                }
             });
             return data;
        }
        catch (err) {
            console.log(err);
            throw new HttpException(JSON.stringify(err), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/presentation-response')
    async presentationResponse(@Body('requestId') requestId: string) {
        try {
            return await storage.get(requestId);
        }
        catch (err) {
            return err;
        }
    }

    @Post('/issuance-request')
    async getMetaverseIdentity(@Body('name') name: string, @Body('familyName') familyName: string) {
        try {
            const accessToken = await this.metaverseIdentityService.getAccessToken();
            const payload = this.metaverseIdentityService.generateIssuancePayload(name, familyName);
            const { data } = await axios.post('https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest', payload, {
               headers: {
                'Authorization': `Bearer ${accessToken}`
               }
            });
            return data;
        }
        catch (err) {
            console.log(err);
            throw new HttpException(JSON.stringify(err), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
