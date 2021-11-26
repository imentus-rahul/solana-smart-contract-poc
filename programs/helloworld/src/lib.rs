use anchor_lang::prelude::*;

declare_id!("FffcgRs2RDsZTVDuiuErHVoTJCHUPcnT46eH3VpycmFi");

#[program]
pub mod helloworld {
    use super::*;

    pub fn initialize(ctx: Context<InitializeDeriveAccounts>) -> ProgramResult {
        println!("initialize method: we are inside contract-::::::::::");
        Ok(())
    }
    
    pub fn mynum(ctx: Context<MynumDeriveAccounts>) -> ProgramResult {
        println!("mynum method: we are inside contract-::::::::::");
        let some_number = &mut ctx.accounts.derive_num;
        some_number.num = 100;
        println!("some_number: {}",some_number.num);
        msg!("some_number: {}",some_number.num);
        Ok(())
    }

    pub fn updatenum(ctx: Context<MynumDeriveAccounts>, value:u16) -> ProgramResult {
        println!("mynum method: we are inside contract-::::::::::");
        let some_number = &mut ctx.accounts.derive_num;
        some_number.num = value; // here we sent dynamic value
        println!("Updated some_number: {}",some_number.num);
        msg!("Updated some_number: {}",some_number.num);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeDeriveAccounts{}

#[derive(Accounts)]
pub struct MynumDeriveAccounts<'info>{
    #[account(init, payer = payeruser, space = 16 + 16)]
    // payeruser must be provided to initialize an "account"
    pub derive_num:Account<'info, MynumStruct>,
    #[account(mut)]
    pub payeruser: Signer<'info>,
    pub system_program: Program <'info, System>, // The "account"'s program owner
}

#[account]
// this account struct will later be used in "fetch" function in camel-case ==> "mynumStruct"
pub struct MynumStruct {
    pub num:u16
}