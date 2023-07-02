import { Controller, Get } from '@nestjs/common';

@Controller('.well-known')
export class WellKnownController {

  @Get('/did-configuration.json')
  didConfiguration() {
    return {
      "@context": "https://identity.foundation/.well-known/contexts/did-configuration-v0.0.jsonld",
      "linked_dids": [
        "eyJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6d2ViOmdyZXktbWFya2V0Lm9yZyNhZWY1ZDcwOWRmMDQ0MjI1YTdmNTk5NmY2NmZmZDc1NnZjU2lnbmluZ0tleS1lNWI1MyJ9.eyJzdWIiOiJkaWQ6d2ViOmdyZXktbWFya2V0Lm9yZyIsImlzcyI6ImRpZDp3ZWI6Z3JleS1tYXJrZXQub3JnIiwibmJmIjoxNjg4Mjg1NDg1LCJleHAiOjI0NzcyOTAyODUsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly9pZGVudGl0eS5mb3VuZGF0aW9uLy53ZWxsLWtub3duL2NvbnRleHRzL2RpZC1jb25maWd1cmF0aW9uLXYwLjAuanNvbmxkIl0sImlzc3VlciI6ImRpZDp3ZWI6Z3JleS1tYXJrZXQub3JnIiwiaXNzdWFuY2VEYXRlIjoiMjAyMy0wNy0wMlQwODoxMToyNS44NjhaIiwiZXhwaXJhdGlvbkRhdGUiOiIyMDQ4LTA3LTAyVDA4OjExOjI1Ljg2OFoiLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRG9tYWluTGlua2FnZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6d2ViOmdyZXktbWFya2V0Lm9yZyIsIm9yaWdpbiI6Imh0dHBzOi8vZ3JleS1tYXJrZXQub3JnLyJ9fX0.ytPGbGuEQrqgso7WHNhhPHOOW_TRbjxUf7Inuj9hIEueR6gHz4pqlkOqZ-redbp2p-iu8EK5jJWCupRS8TSouw"
      ]
    }
  }

  @Get('/did.json')
  did() {
    return {
      "id": "did:web:grey-market.org",
      "@context": [
        "https://www.w3.org/ns/did/v1",
        {
          "@base": "did:web:grey-market.org"
        }
      ],
      "service": [
        {
          "id": "#linkeddomains",
          "type": "LinkedDomains",
          "serviceEndpoint": {
            "origins": [
              "https://grey-market.org/"
            ]
          }
        },
        {
          "id": "#hub",
          "type": "IdentityHub",
          "serviceEndpoint": {
            "instances": [
              "https://hub.did.msidentity.com/v1.0/f42cf8e8-5ec9-49c7-bf93-efc04589c99d"
            ]
          }
        }
      ],
      "verificationMethod": [
        {
          "id": "#aef5d709df044225a7f5996f66ffd756vcSigningKey-e5b53",
          "controller": "did:web:grey-market.org",
          "type": "EcdsaSecp256k1VerificationKey2019",
          "publicKeyJwk": {
            "crv": "secp256k1",
            "kty": "EC",
            "x": "Vu-FHrV0lAp5QWrYR6e27ZPBuPLK-gAxUhYgimjKjJw",
            "y": "vzXG7WXRCafibrGBJXBfm49LDo6j9R_05_7dm6tE_OU"
          }
        }
      ],
      "authentication": [
        "#aef5d709df044225a7f5996f66ffd756vcSigningKey-e5b53"
      ],
      "assertionMethod": [
        "#aef5d709df044225a7f5996f66ffd756vcSigningKey-e5b53"
      ]
    }
  }
}
