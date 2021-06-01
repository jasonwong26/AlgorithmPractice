// https://leetcode.com/problems/binary-watch/

describe.skip("readBinaryWatch", () => {
  it("scenario 1", () => {
     const input = 2;
     const output = readBinaryWatch(input);

     const expected = ["0:03","0:05","0:06","0:09","0:10","0:12","0:17","0:18","0:20","0:24","0:33","0:34","0:36","0:40","0:48","1:01","1:02","1:04","1:08","1:16","1:32","2:01","2:02","2:04","2:08","2:16","2:32","3:00","4:01","4:02","4:04","4:08","4:16","4:32","5:00","6:00","8:01","8:02","8:04","8:08","8:16","8:32","9:00","10:00"];
     expect(output.sort()).toEqual(expected.sort());
  });
});

function readBinaryWatch(turnedOn: number): string[] {
  if(turnedOn === 0) {
    return ["0:00"];
  }

  const output: string[] = [];
  const hourFlags = [1, 2, 4, 8];
  const minuteFlags = [1, 2, 4, 8, 16, 32];
  
  backTrack(output, turnedOn, hourFlags, minuteFlags);
  
  return output;
};

const backTrack = (output: string[], turnedOn: number, hourFlags: number[], minuteFlags: number[], hour = 0, minute = 0, currIndex = 0, depth = 0) => {
  if(hour > 11 || minute > 59) 
    return;

  if(turnedOn === 0) {
    const time = `${hour}:${minute < 10 ? "0" : ""}${minute}`;
    output.push(time);
    return;    
  }

  for(let i = currIndex; i < hourFlags.length + minuteFlags.length; i++) {
    if(i < hourFlags.length) {
      backTrack(output, turnedOn - 1, hourFlags, minuteFlags, hour + hourFlags[i], minute, i + 1, depth + 1);
    } else {
      const minuteIndex = i - hourFlags.length;
      backTrack(output, turnedOn - 1, hourFlags, minuteFlags, hour, minute + minuteFlags[minuteIndex], i + 1, depth + 1);
    }
  }  
}
