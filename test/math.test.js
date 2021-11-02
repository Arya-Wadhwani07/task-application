const {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
} = require('../src/math')

// test('Hello World!',()=>{

// })

// test('This should fail',()=>{
//     throw new Error("Failure!")
// })

test('Should Calculate Total with Tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should Calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('Should convert 0C to 32F', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

// test('Asycn test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 2000)
// })

test('Should add two numbers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})

test('Should add numbers using async await',async()=>{
    const sum = await add(10,22)
    expect(sum).toBe(32)
})