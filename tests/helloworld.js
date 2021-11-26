const anchor = require('@project-serum/anchor');
const assert = require("assert");

// import {
//   Connection,
//   LAMPORTS_PER_SOL,
// } from '@solana/web3.js';
const Connection = require('@solana/web3.js').Connection
const LAMPORTS_PER_SOL = require('@solana/web3.js').LAMPORTS_PER_SOL
const Keypair = require('@solana/web3.js').Keypair
const SystemProgram = require('@solana/web3.js').SystemProgram

describe('helloworld', () => {

  // For setting programid externally using idl and programid
  // // Read the generated IDL.
  // const idl = JSON.parse(require('fs').readFileSync('./target/idl/helloworld.json', 'utf8'));

  // // Address of the deployed program.
  // const programId = new anchor.web3.PublicKey('FffcgRs2RDsZTVDuiuErHVoTJCHUPcnT46eH3VpycmFi');

  // // Generate the program client from IDL.
  // const program = new anchor.Program(idl, programId);

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  console.log("provider pubkey: ", provider.wallet.publicKey.toBase58())
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.Helloworld;

  console.log("0 program inside test cases: ", program) // program 
  console.log("1 programId: ", program.programId.toBase58())
  console.log("2 provider.connection[\"_rpcEndpoint\"] : ", program.provider.connection["_rpcEndpoint"])
  
  async function payersbal(){
    const payerpubKey =  Keypair.fromSecretKey(program.provider.wallet.payer["_keypair"].secretKey)
    console.log("3 provider.wallet.payer : ", payerpubKey.publicKey.toBase58())
    const rpcUrl = program.provider.connection["_rpcEndpoint"];
    let connection = new Connection(rpcUrl, 'confirmed');
    // const lamports = await connection.getBalance(payer.publicKey); // Ref check and delete
    const lamports = await connection.getBalance(payerpubKey.publicKey);
    console.log("4 Payer Wallet Balance : ", lamports/LAMPORTS_PER_SOL) 
  }

  payersbal()

  // we thought to create a single databaseAccount and use it every where to store data and del, but got an error that: "account already in use"
  // const databaseAccount = anchor.web3.Keypair.generate();
  // console.log("5 databaseAccount: ", databaseAccount.publicKey.toBase58())

  // console.log("1 inside test cases: ", program.programId.PublicKey.toBase58()) //this also dont work 
  // console.log("2 inside test cases: ", program.programId.toBase58()) // this works
  // console.log("3 inside test cases: ", program.PublicKey) // this dont work
  // console.log("4 inside test cases: ", program.programId.PublicKey) // this dont work
  // console.log("5 inside test cases: ", program["_programId"]) // this works
  // console.log("6 inside test cases: ", program["_programId"].PublicKey) // this dont work
  // console.log("7 inside test cases: ", program["_programId"]["_bn"]) // this works
  // console.log("8 inside test cases: ", program["_programId"].toBase58()); // this works
  // console.log("9 inside test cases: ", program["_programId"]["_bn"].toBase58()); // this dont work


  it('Test 1: Calling an Empty Function from smart contract => Is initialized!', async () => {
    // Add your test here.
    console.log("We are inside our first test case")
    const tx = await program.rpc.initialize();
    // this is an empty call because we have empty #[derive(Accounts)] for "initialize" method in smart contract
    console.log("Your transaction signature: https://explorer.solana.com/tx/"+tx+"?cluster=devnet");
  });

  it('Test 2: Fetching value from Smart Contract!', async () => {
    // Add your test here.
    
    // const tx = await program.rpc.mynum();
    // console.log("Your transaction signature", tx);

    const databaseAccount = anchor.web3.Keypair.generate();
    console.log("databaseAccount: ", databaseAccount.publicKey.toBase58())

    const tx = await program.rpc.mynum({
      // makesure to send all in camel-case which were earlier declared in snake case in rust contract
      accounts: {
        deriveNum: databaseAccount.publicKey,
        payeruser: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [databaseAccount],
    });

    console.log("Your databaseAccount signature: https://explorer.solana.com/account/"+databaseAccount.publicKey.toBase58()+"?cluster=devnet");

    console.log("Your transaction signature: https://explorer.solana.com/tx/"+tx+"?cluster=devnet");

    const fetchJSvariable = await program.account.mynumStruct.fetch(databaseAccount.publicKey);
    console.log("fetchJSvariable inside mynum(): ", fetchJSvariable)
    console.log("fetchJSvariable inside mynum(): ", fetchJSvariable.num)

    assert.ok(fetchJSvariable.num==100);


  });

  it('Test 3: Assigning value from Smart Contract!', async () => {
    // Add your test here.
    
    // const tx = await program.rpc.mynum();
    // console.log("Your transaction signature", tx);

    const databaseAccount = anchor.web3.Keypair.generate();
    console.log("databaseAccount: ", databaseAccount.publicKey.toBase58())


    // step 1: updating value in the contract
    const tx = await program.rpc.updatenum(value=200,{
      // makesure to send all in camel-case which were earlier declared in snake case in rust contract
      accounts: {
        deriveNum: databaseAccount.publicKey,
        payeruser: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [databaseAccount],
    });

    console.log("Your databaseAccount signature: https://explorer.solana.com/account/"+databaseAccount.publicKey.toBase58()+"?cluster=devnet");

    console.log("Your transaction signature: https://explorer.solana.com/tx/"+tx+"?cluster=devnet");

    // step 2: fetching value from contract to javascript code
    const fetchJSvariable = await program.account.mynumStruct.fetch(databaseAccount.publicKey);
    console.log("fetchJSvariable inside updatenum(): ", fetchJSvariable)
    console.log("fetchJSvariable inside updatenum(): ", fetchJSvariable.num)

    assert.ok(fetchJSvariable.num==200);
  });
});
