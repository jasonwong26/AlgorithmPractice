//import { promisify } from "node:util";

export const promisify = (func: (...params: any[]) => unknown) => {
  return (...args: unknown[]) => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if(!error) 
          resolve(result);
        else 
          reject(error);
      }

      func(...args, callback);
    });
  }
}

  /*
    resolve: returns array of results
    reject: on FIRST error, return reject and 
  */

export const promiseAll = (promises: unknown[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    if(!promises || promises.length === 0) resolve([]);

    let resolved = 0;
    const results = new Array(promises.length);
    for(let i = 0; i < promises?.length || 0; i++) {
      const p = Promise.resolve(promises[i]);
        p
          .then(value => {
            results[i] = value;
            resolved++;

            if(resolved === results.length)
              resolve(results);
          })
          .catch(error => {
            reject(error);
          });
      }   
  });
}