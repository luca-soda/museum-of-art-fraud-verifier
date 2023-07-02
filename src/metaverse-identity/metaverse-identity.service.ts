import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import * as msal from '@azure/msal-node';
import base64url from 'base64url';

dotenv.config();

@Injectable()
export class MetaverseIdentityService {

    async getAccessToken() {
        var msalConfig = {
            auth: {
                clientId: process.env.CLIENT_ID,
                authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
                clientSecret: process.env.SECRET,
            },
            system: {
                loggerOptions: {
                    loggerCallback(loglevel, message, containsPii) {
                        console.log(message);
                    },
                    piiLoggingEnabled: false,
                    logLevel: msal.LogLevel.Verbose,
                }
            }
        };

        const cca = new msal.ConfidentialClientApplication(msalConfig);
        const msalClientCredentialRequest = {
            scopes: ["3db474b9-6a0c-4840-96ac-1fceb342124f/.default"],
            skipCache: false,
        };
        module.exports.msalCca = cca;
        module.exports.msalClientCredentialRequest = msalClientCredentialRequest;

        const msIdentityHostName = "https://verifiedid.did.msidentity.com/v1.0/";

        const result = await cca.acquireTokenByClientCredential(msalClientCredentialRequest);
        if (!result.accessToken) {
            throw new Error(`Could not acquire access token. Check your configuration for tenant ${process.env.TENTANT_ID} and clientId ${process.env.CLIENT_ID}`);
        } else {
            return result.accessToken;
        }
    }

    generateIssuancePayload(firstName: string, lastName: string) {
        return {
            "authority": process.env.AUTHORITY,
            "includeQRCode": true,
            "registration": {
                "clientName": "ION-Experiment"
            },
            "callback": {
                "url": `${process.env.HOST}/metaverse-identity/issuance-callback`,
                "state": uuidv4(),
                "headers": {
                    "api-key": process.env.API_KEY
                }
            },
            // "pin": {
            //     "value": "0000",
            //     "length": 4
            // },
            "type": "MetaverseIdentity",
            "manifest": process.env.MANIFEST,
            "claims": {
                "given_name": firstName,
                "family_name": lastName
            }
        }
    }

    generateVerifierPayload() {
        return {
            "includeQRCode": true,
            "callback": {
              "url": `${process.env.HOST}/metaverse-identity/presentation-callback`,
              "state": uuidv4(),
            },
            "authority": process.env.AUTHORITY,
            "registration": {
              "clientName": "Museum of Art Fraud",
              "purpose": "Così so chi sei"
            },
            "includeReceipt": true,
            "requestedCredentials": [
              {
                "type": "MetaverseIdentity",
                "acceptedIssuers": [ process.env.AUTHORITY ]
              }
            ],
            "configuration": {
              "validation": {
                "allowRevoked": true,
                "validateLinkedDomain": true
              }
            }
          }
    }
}
