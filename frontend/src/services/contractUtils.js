import { getAcct } from "./utils";

export async function buyNFTwithPool(sale_id, amount, owner_email) {
  const acct = await getAcct();
  return await acct.functionCall({
    contractId: process.env.REACT_APP_CONTRACT_NAME,
    methodName: "buy_with_pool",
    args: {
      sale_id: sale_id,
      owner_email: owner_email,
    },
    gas: 300000000000000,
    attachedDeposit: amount,
  });
}

export async function nftTokenForEmailOwner(
  owner_email,
  fromIndex = "0",
  limit = 100
) {
  const acct = await getAcct();
  return await acct.viewFunction(
    process.env.REACT_APP_CONTRACT_NAME,
    `nft_tokens_for_email_owner`,
    {
      owner_email: owner_email,
      from_index: fromIndex,
      limit,
    }
  );
}
