# AA Temp

This AA Wallet Template was created to help hackers or developers who wish to create an AA wallet, particularly for hackathons. This template includes fundamental features such as user operations, transaction bundling and master key management, allowing hackers to concentrate on developing the core functionalities of their AA wallet using this foundation.so they can more focus on their core functionalities rather wasting time on building this base stuff. This wallet master key management was Powered by LIT PKP's, Particle and Dataverse Wallet.This uses the Stackup's bundler and Userop.js to do the transaction bundling and user operations.

[demo video]()

[live link](https://aa-template.vercel.app/)

### How to use this template

Please clone the repository and ensure that you add a .env file, using the provided .env.example as a reference for setting the required variables.

## Technologies Used

### Particle

Leveraged the Particle Network Auth service to use MPC-TSS as master key for AA wallet.

[code](https://github.com/dinesh11515/AA-Template/blob/main/components/onboard/Particle/particle.js)

### Lit Protocol

Leveraged the LIT PKPS to provide PKP as master key for AA wallet.

[code](https://github.com/dinesh11515/AA-Template/blob/main/components/onboard/LIT/LIT.js)

### Polybase

This made full use of Polybase to efficiently store all wallet information.

[code](https://github.com/dinesh11515/AA-Template/blob/main/pages/wallet/%5Baddress%5D.js#L28)

### Dataverse-os wallet

Leveraged the Dataverse-os wallet to enable the wallet connection.

[code](https://github.com/dinesh11515/AA-Template/blob/main/components/onboard/Dataverse-wallet/wallet.js)

### BlockPI Network

Leveraged the BlockPI Network Mumbai RPC URL to power the AA-Temp
