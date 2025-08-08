const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/log", (req, res) => {
  const data = req.body;
  console.log("클릭 로그 수신:", data);

  // 파일에 로그 저장
  fs.appendFileSync("click-logs.txt", JSON.stringify(data) + "\n");

  res.status(200).send("로그 저장 완료");
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
