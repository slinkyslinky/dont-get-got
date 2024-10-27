import fs from "node:fs/promises";

const settings = {
    numberOfTasks: {
        Easy: 3,
        Medium: 2,
        Hard: 1
    }
}

function getRandomTasks(level, data) {
    const list = data.filter((task) => task.level === level);
    const result = new Set()
    if (list.length <= settings.numberOfTasks[level]) {
        result.push(...list)
    } else {

        while (result.size < settings.numberOfTasks[level]) {
            const number = Math.round(Math.random() * list.length)
            console.log(number, list[number])
            result.add(list[number])
        }
    }

    return Array.from(result)
}

export async function GET() {
    let playerTasks = []
    const data = JSON.parse(await fs.readFile('public/tasks.json', 'utf8'))

    const filtered = data.filter(task => !task.reserved)
    playerTasks = [...getRandomTasks('Easy', filtered)]
    playerTasks.forEach(reserved => {
        data.find(task => task.id === reserved.id).reserved = true
    })
    await fs.writeFile('public/tasks.json', JSON.stringify(data), 'utf8',)
    return Response.json(playerTasks)

}

export async function DELETE() {

}
export const dynamic = 'force-dynamic'