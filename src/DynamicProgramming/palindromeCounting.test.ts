//https://algo.monster/problems/palindrome_counting

describe.skip("Palindrome Counting", () => {
  it("scenario 1", () => {
    const input = "abab";
    const sum = palindromeCounting(input);

    const expected = 6;
    expect(sum).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = "vegiuodewzoigkospxfoutflqrgnvgqsk";
    const sum = palindromeCounting(input);

    const expected = 33;
    expect(sum).toEqual(expected);
  });
});


// Notes:
// - TONS of off by one errors
// - really strugged with this one

// cache: 2d array (row: start index, col = stop index)

//recurrence relation: dp[0,n] = dp[0,0]...dp[n,n] 
function palindromeCounting(s: string) : number {
  // prepare cache 2d array
  const cache = [];
  for (let i = 0; i < s.length; i++) {
      const row = new Array(s.length).fill(false);
      //initialize first result sets (negative to single character length strings) to true
      for (let n = 0; n <= i; n++) {
          row[n] = true;
      }
      cache.push(row);
      
  }
  //console.log("cache", {cache});
     
  for (let length = 2; length <= s.length; length++) { // process increasingly large substrings
      for (let start = 0; start < s.length; start++) { // loop from start to end of string
          if(start + length > s.length) continue;
          
          const row = start;
          const col = start + length - 1;
          const val = s.substring(row, col + 1);
          const firstLetter = val.charAt(0);
          const lastLetter = val.charAt(val.length - 1);
          
          const priorRow = row + 1;
          const priorCol = col - 1;
          const priorVal = s.substring(priorRow, priorCol + 1);
          const priorCache = cache[priorRow][priorCol];
          
          const isFirstLetterMatch = firstLetter === lastLetter;
          if(priorCache && isFirstLetterMatch) cache[row][col] = true;
      }
  }
  
  //console.log("cache", {cache});
  let count = 0;
  for(let i = 0; i < s.length; i++) {
      for (let n = i; n < s.length; n++) {
          if(cache[i][n]) count++;
      }
  }
      
  return count;
}