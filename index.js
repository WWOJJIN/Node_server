const express = require("express")
const app = express()
const PORT = 3000


app.use(express.json())

// 가상의 사용자 배열
let users = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "김철수" },
    { id: 3, name: "홍경복" }
];

app.post("/users", (req, res) => {
    try {
        const newUser = req.body
        users.push({
            id: Date.now(),
            ...newUser
        })
        res.status(201).json({ message: "사용자 추가완료", users })
    } catch (error) {
        console.error("사용자 추가중 오류", error)
        res.status(500).json({ message: "서버 오류 발생" })

    }
})

app.get("/users", (req, res) => {
    try {
        res.json(users)
        res.status(200).json({ message: "성공적 가져오기" })
    } catch (error) {
        console.error("사용자 조회중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})


app.get("/users/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)

        const index = users.findIndex(u => u.id === userId)

        if (index === -1) {
            return res.status(404).json({ message: "조회할 사용자가 없습니다" })
        }
        res.status(200).json({ message: "1명 데이터 조회 완료", user: users[index] })
    } catch (error) {
        console.error("사용자 1명  조회 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})

app.put("/users/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)

        const index = users.findIndex(u => u.id === userId)

        if (index === -1) {
            return res.status(404).json({ message: "조회할 사용자가 없습니다" })
        }
        const updateData = req.body

        users[index] = {
            ...users[index],
            ...updateData
        }
        res.status(200).json({ message: "1명 데이터 조회 완료", user: users[index] })
    } catch (error) {
        console.error("사용자 1명  조회 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})

app.delete("/users/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)
        const index = users.findIndex(u => u.id == userId)
        if (index === -1) {
            return res.status(404).json({ message: "삭제할 사용자가 없습니다." })
        }
        user.splice(index, 1)
        res.status(201).json({ message: "사용자 1명 삭제 완료", users })
    } catch (error) {
        console.error("사용자 삭제중 오류")
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})







app.get("/", (req, res) => {
    res.send("hello world")
})
//req 요청 res 응답

app.listen(PORT, () => {
    console.log("Server is running")
})
