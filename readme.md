# Program ID: FffcgRs2RDsZTVDuiuErHVoTJCHUPcnT46eH3VpycmFi
BBIP39 Passphrase (empty for none): 

Wrote new keypair to program.json
pubkey: FffcgRs2RDsZTVDuiuErHVoTJCHUPcnT46eH3VpycmFi
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
wave unit oil tiny dune little genre category suit tower planet fatal


# Commands
- anchor init helloworld --javascript
- (Make sure the name is all in small case and no space and snake/camel case/capital letters)
- solana-keygen new -o program.json
- Replace all existing program id with new generated in program.json
- npm i
- anchor build ====> target/ (consists of idl)
- Replace existing program id inside target/deploy/{programname}.json with new generated in program.json
- solana config set payer and url to devnet: solana config get
- solana balance
- anchor deploy
- anchor test
### +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
- cargo clean
- anchor build
- Replace all existing program id with new generated in program.json
- anchor deploy 
-       "or"
- solana program deploy /home/imentus/Desktop/anchor-scratch/helloworld/target/deploy/helloworld.so --program-id /home/imentus/Desktop/anchor-scratch/helloworld/target/deploy/helloworld-keypair.json
- anchor test ===> It redeploys the contract and run tests folder
### +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# To run test cases on top of localnet
- solana config set --url localhost
- Replace "devnet" to "localnet" inside Anchor.toml
- Terminal 1: solana-test-validator
- Terminal 2: anchor test

# Install anchor
- npm i -g @project-serum/anchor-cli




