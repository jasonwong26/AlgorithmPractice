//https://algo.monster/problems/coin_change

describe.skip("Coin Change", () => {
  it("scenario 1", () => {
    const coins = [1, 2, 5];
    const amount = 11;
    const max = coinChange(coins, amount);

    const expected = 3;
    expect(max).toEqual(expected);
  });
  it("scenario 2", () => {
    const coins = [4, 5, 3];
    const amount = 3;
    const max = coinChange(coins, amount);

    const expected = 1;
    expect(max).toEqual(expected);
  });
  it("scenario 3", () => {
    const coins = [5];
    const amount = 0;
    const max = coinChange(coins, amount);

    const expected = 0;
    expect(max).toEqual(expected);
  });
  
  it("scenario 4", () => {
    const coins = [5];
    const amount = 1;
    const max = coinChange(coins, amount);

    const expected = -1;
    expect(max).toEqual(expected);
  });
});

/*
Notes:
- cache = array of values from 0 to target
- watch out for min aggregation - forgot to account for min() equal to 0 in first implementation
*/

// cache: key: amount, value: min coins used
// actual recurrence relation: dp[i] = min(1 + dp[i - coin]) for coin in coins
function coinChange(coins, amount) {
  const cache = [0];
  cache[0] = 0;

  //console.log("initialize", {coins, amount, cache});
  for(let i = 1; i <= amount; i++) {
      const amount = i;
      let min = null;
      for(let n = 0; n < coins.length; n++) {
          const coin = coins[n];
          const priorAmount = amount - coin;
          const priorCount = cache[priorAmount];
          
          //console.log("coin", {amount, coin, priorAmount, priorCount});
          if(priorCount == null) continue;
          
          const count = priorCount + 1;
          min = min == null ? count : Math.min(min, count);
          //console.log("coin append", {amount, coin, priorAmount, priorCount, count, min});
      }
      cache.push(min);
      //console.log("push", {amount, min});
  }
  
  return cache[amount] ?? -1;    
}
