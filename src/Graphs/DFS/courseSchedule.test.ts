// https://algo.monster/problems/course_schedule

describe("Is Valid Course Schedule", () => {
  it("scenario 1", () => {
    const n = 2;
    const reqs = [[0, 1]];
    const isValid = isValidCourseSchedule2(n, reqs);

    const expected = true;
    expect(isValid).toEqual(expected);
  });
  it("scenario 2", () => {
    const n = 2;
    const reqs = [[0, 1], [1, 0]];
    const isValid = isValidCourseSchedule2(n, reqs);

    const expected = false;
    expect(isValid).toEqual(expected);
  });
  it("scenario 3", () => {
    const n = 2;
    const reqs = [[0, 1], [1, 2],[2,0]];
    const isValid = isValidCourseSchedule2(n, reqs);

    const expected = false;
    expect(isValid).toEqual(expected);
  });
  it("scenario 4", () => {
    const n = 4;
    const reqs = [[0, 1], [1, 2], [2,3], [3,1]];
    const isValid = isValidCourseSchedule2(n, reqs);

    const expected = false;
    expect(isValid).toEqual(expected);
  });
});

// time: O(n^2) space O(n)
function isValidCourseSchedule(n: number, prerequisites: number[][]) {
  const map = new Map<number, number[]>();

  for(let i = 0; i < prerequisites.length; i++) {
    const [key, ...rest] = prerequisites[i];
    map.set(key, rest);
  }

  for(let i = 0; i < n; i++) {
    const visited: boolean[] = new Array(n).fill(false);
    if(hasInvalidRequisite(i, map, visited)) return false;
  }

  return true;
}

function hasInvalidRequisite(courseId: number, prerequisites: Map<number, number[]>, visited: boolean[], depth: number = 0): boolean {
  // course has no prerequisites
  if(!prerequisites.has(courseId)) return false;

  // course has prerequisite was already visied
  if(visited[courseId]) return true;

  visited[courseId] = true;
  const requisites = prerequisites.get(courseId);
  let isValid = false;
  for(let i = 0; i < requisites.length; i++) {
    const prereq = requisites[i];

    isValid = hasInvalidRequisite(prereq, prerequisites, visited, depth++);
  }

  return isValid;
}


// time: O(n^2) space O(n)
function isValidCourseSchedule2(n: number, prerequisites: number[][]) {
  const map = new Map<number, number[]>();
  for(let i = 0; i < prerequisites.length; i++) {
    const [key, ...rest] = prerequisites[i];
    map.set(key, rest);
  }
  const visited: number[] = new Array(n).fill(CourseState.ToVisit);

  for(let i = 0; i < n; i++) {
    if(hasInvalidRequisite2(i, map, visited)) return false;
  }

  return true;
}

enum CourseState {
  ToVisit = 0,
  Visiting = 1,
  Visited = 2
}

function hasInvalidRequisite2(courseId: number, prerequisites: Map<number, number[]>, visited: number[], depth: number = 0): boolean {
  // course has no prerequisites
  if(!prerequisites.has(courseId)) return false;
  
  // course previously visited, no cycle found
  if(visited[courseId] === CourseState.Visited) return false;

  // course previously visited, cycle found
  if(visited[courseId] === CourseState.Visiting) return true;

  // mark current course under validation
  visited[courseId] = CourseState.Visiting;
  const requisites = prerequisites.get(courseId);
  for(let i = 0; i < requisites.length; i++) {
    const prereq = requisites[i];

    if(visited[prereq] === CourseState.Visited) continue;
    if(hasInvalidRequisite2(prereq, prerequisites, visited, depth++)) return true;
  }

  visited[courseId] = CourseState.Visited;

  return false;
}
