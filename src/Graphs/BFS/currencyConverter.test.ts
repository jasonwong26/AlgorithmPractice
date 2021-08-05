/* Mock interview with Alex

// INPUT: a collection of strings
// Each string will be of format l1:l2:ratio i.e. USD:CAD:1.20
// INput is sane. Input is complete (i.e. nodes connected)
// OUTPUT: a funcion that takes 2 arguments
// Each argument is a label; function returns ratio of l1/l2
// I.e. GBP:YEN:180 and YEN:CAD:.02 .. GBP:CAD should be resolved
*/

describe.skip("Currency Converter", () => {
  it("scenario 1", () => {
    const input = ["USD:CAD:1.20"];
    const func = buildConverter(input);
    const output = func("USD", "CAD");
    const expected = 1.2;
    expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = ["USD:CAD:1.20", "CAD:GBP:2.00"];
    const func = buildConverter(input);
    const output = func("USD", "GBP");
    const expected = 2.4;
    expect(output).toEqual(expected);
  });
  it("scenario 3", () => {
    const input = ["USD:CAD:1.20", "CAD:GBP:2.00", "USD:YEN:1000"];
    const func = buildConverter(input);
    const output = func("YEN", "GBP");
    const expected = 0.0024;
    expect(output).toEqual(expected);
  });
  it("scenario 4", () => {
    const input = ["USD:CAD:1.20", "CAD:GBP:2.00", "USD:YEN:1000"];
    const func = buildConverter(input);
    const output = func("YEN", "Doesn't Exist");
    const expected = null;
    expect(output).toEqual(expected);
  });
  it("scenario 5", () => {
    const input = ["USD:CAD:1.20", "CAD:GBP:2.00", "USD:YEN:1000"];
    const converter = new CurrencyConverter(input);
    const output = converter.getRatio("YEN", "GBP");
    const expected = 0.0024;
    expect(output).toEqual(expected);
  });
});

function buildConverter(input: string[]) {
	const grid = new Map<string,Set<string>>();
  const map = new Map<string, number>(); 

  const addNeighbor = (current: string, neighbor: string) => {
    const currNode = grid.get(current);
    if(currNode)
      currNode.add(neighbor);
    else
      grid.set(current, new Set<string>([neighbor]));
  }

  for(let i of input) {
    const parsed = i.split(":");
    const [label1, label2, ratio] = parsed;
    
    addNeighbor(label1, label2);
    addNeighbor(label2, label1);
  
  	const ratioVal = Number.parseFloat(ratio);
  	map.set(`${label1}:${label2}`, ratioVal);
    map.set(`${label2}:${label1}`, 1 / ratioVal);
  }
  
  interface QueueElement {
    label: string,
    ratio: number,
    depth: number,
    last: string
  }

	const output = (label1: string, label2: string): number => {
    const visited = new Set<string>();
    const queue: QueueElement[] = [{
      label: label1,
      ratio: 1,
      depth: 0,
      last: null
    }];
    
    while(queue.length > 0) {
      const curr = queue.shift();
      
      // end found
      if(curr.label === label2)
        return curr.ratio;
      
      if(visited.has(curr.label)) continue;
      visited.add(curr.label);
      
      const neighbors = grid.get(curr.label);
      if(!neighbors) break;
      
      neighbors.forEach(next => {
        const ratio = map.get(`${curr.label}:${next}`);

        queue.push({
          label: next,
        	ratio: curr.ratio * ratio,
          depth: curr.depth + 1,
          last: curr.label
        });        
      });
    }
    
    return null;
  };

	return output;
}

interface QueueElement {
  label: string,
  ratio: number,
  depth: number,
  last: string
}
class CurrencyConverter {
  private _grid: Map<string, Set<string>>;
  private _map: Map<string, number>;

  constructor(input: string[]) {
    this._grid = new Map();
    this._map = new Map();

    this.populateGrid(input);
  }

  private populateGrid = (input: string[]): void => {
    for(let i of input) {
      const parsed = i.split(":");
      const [label1, label2, ratio] = parsed;
      
      this.addNeighbor(label1, label2);
      this.addNeighbor(label2, label1);
    
      const ratioVal = Number.parseFloat(ratio);
      this._map.set(`${label1}:${label2}`, ratioVal);
      this._map.set(`${label2}:${label1}`, 1 / ratioVal);
    }
  }
  private addNeighbor = (current: string, neighbor: string) => {
    const currNode = this._grid.get(current);
    if(currNode)
      currNode.add(neighbor);
    else
      this._grid.set(current, new Set<string>([neighbor]));
  }

  getRatio = (label1: string, label2: string): number => {
    const visited = new Set<string>();
    const queue: QueueElement[] = [{
      label: label1,
      ratio: 1,
      depth: 0,
      last: null
    }];
    
    while(queue.length > 0) {
      const curr = queue.shift();
      
      // end found
      if(curr.label === label2)
        return curr.ratio;
      
      if(visited.has(curr.label)) continue;
      visited.add(curr.label);
      
      const neighbors = this._grid.get(curr.label);
      if(!neighbors) break;
      
      neighbors.forEach(next => {
        const ratio = this._map.get(`${curr.label}:${next}`);

        queue.push({
          label: next,
        	ratio: curr.ratio * ratio,
          depth: curr.depth + 1,
          last: curr.label
        });        
      });
    }
    
    return null;
  };
}