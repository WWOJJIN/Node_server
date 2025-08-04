const express = require("express")
const app = express()

const PORT = 3000

app.use(express.json())
let boards = [
    {
        id: 1,
        displayId: 1,
        title: "title3",
        content: "content3",
        createdAt: "2025-08-01"
    },
    {
        id: 2,
        displayId: 2,
        title: "title323",
        content: "content3",
        createdAt: "2025-08-01"
    },
    {
        id: 3,
        displayId: 3,
        title: "title333",
        content: "content3",
        createdAt: "2025-08-01"
    },
]
let initId = 4


app.post("/boards", (req, res) => {
    try {
        const newBoard = {
            id: initId++,
            displayId: boards.length + 1,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date().toISOString()
        }
        boards.push(newBoard)

        res.status(201).json({ message: "게시글 생성 완료", boards })
    } catch (error) {
        console.error("게시글 생성중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.get("/boards", (req, res) => {
    try {

        res.status(201).json({ message: "게시글 생성 완료", boards })
    } catch (error) {
        console.error("게시글 생성중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

app.get("/boards/:id", (req, res) => {
    try {
        const userdId = Number(req.params.id);

        const index = boards.findIndex(u => u.id === userdId);

        if (index === -1) {
            return res.status(404).json({ message: "조회할 게시글이 없습니다" });
        }

        res.status(200).json({ message: "1개 게시글 조회 완료", boards: boards[index] });
    } catch (error) {
        console.error("게시글 1개 조회 중 오류", error);
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }
})

app.delete("/boards/:id", (req, res) => {
    try {
        const userdId = Number(req.params.id);

        const index = boards.findIndex(u => u.id === userdId);

        if (index === -1) {
            return res.status(404).json({ message: "게시글 삭제중 오류" });
        }
        boards.splice(index, 1)
        res.status(200).json({ message: "게시글 1개 삭제완료", boards })
    } catch (error) {
        console.error("게시글 1개 조회 중 오류", error);
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }
})
//게시글 제목 수정하기
app.patch("/boards/:id/title", (req, res) => {
    try {
        const userdId = Number(req.params.id);

        const index = boards.findIndex(u => u.id === userdId);

        if (index === -1) {
            return res.status(404).json({ message: "일부 게시글 수정 중 아이디가 없음" })
        }
        const { title } = req.body

        if (typeof title !== 'string' || title.trim() === "") {
            return res.status(400).json({
                message: "타이틀은 비어있지않은 문자열이어야합니다"
            })
        }
        boards[index] = {
            ...boards[index],
            title: title.trim()
        }
        res.status(200).json({ message: "게시글 제목 수정하기 완료", board: boards[index] })
    } catch (error) {
        console.error("게시글 1개 조회 중 오류", error);
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }

})
//게시글 컨텐츠 수정하기
app.patch("/boards/:id/content", (req, res) => {
    try {
        const boardId = Number(req.params.id);

        const index = boards.findIndex(b => b.id === boardId);

        if (index === -1) {
            return res.status(404).json({ message: "컨텐츠 수정 중 아이디가 없음" });
        }

        const { content } = req.body;

        if (typeof content !== 'string' || content.trim() === "") {
            return res.status(400).json({
                message: "컨텐츠는 비어있지 않은 문자열이어야 합니다"
            });
        }

        boards[index] = {
            ...boards[index],
            content: content.trim()
        };

        res.status(200).json({ message: "게시글 컨텐츠 수정하기 완료", board: boards[index] });
    } catch (error) {
        console.error("게시글 컨텐츠 수정 중 오류", error);
        res.status(500).json({ message: "서버 내부 오류 발생" });
    }
});




app.get("/", (req, res) => {
    res.send("Hello, woojin")
})
app.listen(PORT, () => {
    console.log("Server running")
})