const express = require("express");
const fs = require("fs"); // ⬅ 이미 선언됨
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 클릭 로그 저장
app.post("/log", (req, res) => {
  const data = req.body;
  console.log("클릭 로그 수신:", data);
  fs.appendFileSync("click-logs.txt", JSON.stringify(data) + "\n");
  res.status(200).send("로그 저장 완료");
});

// 헬스 체크
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// 로그 파일 보기
app.get("/logs", (req, res) => {
  const logPath = path.join(__dirname, "click-logs.txt");
  fs.readFile(logPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("로그 파일을 읽을 수 없습니다.");
    }
    res.type("text/plain").send(data);
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
