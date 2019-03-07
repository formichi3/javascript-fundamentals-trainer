import * as exercises from "./index"

const $ = sel => document.querySelector(sel);

test("EXERCISE 1: writeLater, test 1", () => {
  exercises.writeLater(() => "callback hell?");
  expect($("p.write-later").innerHTML).not.toBe("callback hell?")
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        expect($("p.write-later").innerHTML).toBe("callback hell?")
        res()
      }
      catch {
        rej($("p.write-later").innerHTML)
      }
    }, 550)
  }).catch(text => {
    throw new Error(`Test failed. Found "${text}" in p.write-later instead of the callback output.`)
  })
})

test("EXERCISE 1: writeLater, test 2", () => {
  exercises.writeLater(() => "more like callback heaven.");
  expect($("p.write-later").innerHTML).not.toBe("more like callback heaven.")
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        expect($("p.write-later").innerHTML).toBe("more like callback heaven.")
        res()
      }
      catch {
        rej($("p.write-later").innerHTML)
      }
    }, 650)
  }).catch(text => {
    throw new Error(`Test failed. Found "${text}" in p.write-later instead of the callback output.`)
  })
})

test("EXERCISE 2: promisify, test 1", () => {
  const cb = () => 99
  const promise = exercises.promisify(cb)
  return promise.then(val => {
    expect(val).toBe(99)
  })
})

test("EXERCISE 2: promisify, test 2", () => {
  const cb = () => "hamberders"
  const promise = exercises.promisify(cb)
  return promise.then(val => {
    expect(val).toBe("hamberders")
  })
})

test("EXERCISE 3: fetchTodos", () => {
  $("ul.todo-list").innerHTML = ""
  const promise = exercises.fetchTodos()
  expect($("ul.todo-list").children.length).toBe(0)
  return promise.then(() => {
    expect($("ul.todo-list").children.length).toBe(20)
    const exampleTodo = $("ul.todo-list").children[17]
    console.log(exampleTodo, exampleTodo.textContent.length)
    expect(exampleTodo.textContent.length).toBeGreaterThan(0)
  })
})

test("EXERCISE 4: Fetcher.fetchData", () => {
  expect.assertions(2)
  const fetcher = new exercises.Fetcher()
  expect(fetcher.dataFetched).toBe(false)
  return fetcher.fetchData("https://jsonplaceholder.typicode.com/todos")
    .then(() => {
      expect(fetcher.dataFetched).toBe(true)
    })
})

test("EXERCISE 5: contextBindingResponse", () => {
  expect(exercises.contextBindingResponse.length).toBeGreaterThan(280)
})

test("EXERCISE 6: exporting a named export", () => {
  expect(exercises.namedExport1).toBe(128)
})

test("EXERCISE 7: exporting a default export", () => {
  expect(exercises.default).toBe(256)
})

test("EXERCISE 8: importing a named export", () => {
  expect(exercises.getNamedExport()).toBe("es6 named export")
})

test("EXERCISE 9: importing a default export", () => {
  expect(exercises.getDefaultExport()).toBe("es6 default export")
})

test("EXERCISE 16: variable declarations", () => {
  expect(exercises.counters).toEqual([0, 1, 2, 3, 4])
})

test(`EXERCISE 17: variable declarations, short answer 
  (we're also reading and reviewing these written answers`, () => {
    expect(exercises.variableDeclarationsResponse.length).toBeGreaterThan(280)
  })

test("EXERCISE 18: string template literals", () => {
  expect(exercises.literally("the worst")).toBe(
    "literally the worst!"
  )
  expect(exercises.literally("intoxicating")).toBe(
    "literally intoxicating!"
  )
})

