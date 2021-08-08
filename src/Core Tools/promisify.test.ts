import { promisify, promiseAll } from "./promisify";

describe.skip("promisify", () => {
  const func = (wait: number, throwError: boolean, callback: (error: Error, result: number) => unknown) => {
    setTimeout(() => {
      const error = throwError ? new Error("test error") : null;
      callback(error, wait);
    }, wait);
  };

  it("awaits success correctly", done => {
    const asPromise = promisify(func);
    const waitTime = 500;
    asPromise(waitTime, false)
      .then(result => {
        console.log({result});
        expect(result).toEqual(waitTime); 
        done();
      })
      .catch(error => {
        console.log(error);
        fail();
        done();
      });
  });
  it.skip("handles errors correctly", done => {
    const asPromise = promisify(func);
    const waitTime = 500;
    asPromise(waitTime, true)
      .then(() => {
        fail();
        done();
      })
      .catch(error => {
        console.log({error})
        expect(error).toEqual(new Error("test error")); 
        done();
      });
  });
});

describe("promiseAll", () => {
  const func = (wait: number, error: Error, callback: (error: Error, result: number) => unknown) => {
    setTimeout(() => {
      callback(error, wait);
    }, wait);
  };

  it("awaits all success correctly", done => {
    const asPromise = promisify(func);
    const promises = [Promise.resolve(3), 32, "test", asPromise(500, null)];

    promiseAll(promises)
      .then(result => {
        expect(result).toEqual([3, 32, "test", 500]); 
        done();
      })
      .catch(error => {
        console.log(error);
        fail();
        done();
      });
  });
  it("handles errors correctly", done => {
    const asPromise = promisify(func);
    const error = new Error("test error");
    const promises = [Promise.resolve(3), asPromise(500, error), asPromise(700, error)];

    promiseAll(promises)
      .then(result => {
        fail(); 
        done();
      })
      .catch(e => {
        expect(e).toEqual(error); 
        done();
      });
  });
});
