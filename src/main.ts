import { app, BrowserWindow } from "electron";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";

const getFilePath = (fileName: string) => {
  if (app.isPackaged) {
    // Đường dẫn khi ứng dụng đã được build
    return path.join(app.getAppPath(), "caro/build", fileName);
  } else {
    // Đường dẫn trong chế độ phát triển
    return path.join(__dirname, "../caro/build", fileName);
  }
};

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Bật tính năng này để sử dụng nodeIntegration
    },
  });

  // Tải file HTML từ server
  win.loadURL("http://localhost:3000");
}

// Tạo server HTTP
const server = http.createServer((req, res) => {
  // Lấy tên tệp từ đường dẫn yêu cầu
  const filePath = getFilePath(
    req.url === "/" || !req.url ? "index.html" : req.url.substring(1)
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      console.log("Duong dan cua tep loi la: ", filePath, err);
      return res.end("404 Not Found");
    }

    // Xác định kiểu nội dung dựa trên đuôi tệp
    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
      case ".js":
        contentType = "application/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      case ".svg":
        contentType = "image/svg+xml";
        break;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

// Khởi động server trên cổng 3000
server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

// Khởi động ứng dụng Electron
app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
