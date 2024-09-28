## Gomoku Calculator V0.26

### Câu hỏi thường gặp

- Ứng dụng này có thể làm gì?

  Ứng dụng này có thể được sử dụng như một bảng gomoku, hoặc dùng để phân tích các vị trí gomoku với sự hỗ trợ của AI. Bạn cũng có thể chơi với AI.

- Đã có rất nhiều phần mềm gomoku trên nền tảng di động, ứng dụng này có gì đặc biệt?

  Phần lớn các ứng dụng gomoku trên nền tảng di động không cung cấp phân tích chi tiết, trong khi các ứng dụng khác có hỗ trợ phân tích lại giới hạn trên một số nền tảng nhất định. Vì ứng dụng này thực chất là một trang web, nó có thể chạy trên hầu hết mọi thiết bị có trình duyệt phù hợp, điều này mang lại sự tiện lợi hơn.

- Khi sử dụng trong trình duyệt di động, thanh địa chỉ chiếm nhiều không gian màn hình. Có cách nào để sử dụng ứng dụng ở chế độ toàn màn hình không?

  Với trình duyệt Safari trên IOS và trình duyệt Chrome trên Android, bạn nên chọn tùy chọn "**Thêm vào màn hình chính**" để có trải nghiệm sử dụng tương tự như ứng dụng gốc.

- AI gomoku nào được sử dụng?

  Ứng dụng này sử dụng công cụ Rapfi, từng tham gia giải đấu Gomocup 2021. Với công nghệ Web-Assembly, Rapfi có thể đạt hiệu suất gần như ứng dụng gốc và không cần giao tiếp với máy chủ khi suy nghĩ.

- Ứng dụng hỗ trợ những luật nào?

  Hiện tại ứng dụng hỗ trợ các luật "Gomoku Tự do", "Gomoku Chuẩn", "Renju Tự do" và "Gomoku Tự do - SWAP1".

- Làm thế nào để AI tự động đi nước cờ?

  Chọn "**AI chơi Quân Đen**" hoặc "**AI chơi Quân Trắng**" trong trang cài đặt, sau đó khi đến lượt AI đi, bạn chỉ cần nhấp vào bất kỳ ô nào trên bảng và AI sẽ bắt đầu suy nghĩ.

- Ý nghĩa của "+M" và "-M" trong đánh giá là gì?

  Nếu "+M" hoặc "-M" xuất hiện trong đánh giá, điều đó có nghĩa là AI đã tìm thấy chiến thắng hoặc thất bại ép buộc, và con số phía sau là số bước tối đa để kết thúc trận đấu.

- Phân tích chế độ ngoài thời gian không giới hạn có gì khác biệt?

  Trong chế độ phân tích, AI không dừng suy nghĩ khi tìm thấy chiến thắng hoặc thất bại ép buộc, vì tiếp tục suy nghĩ có thể tìm thấy giải pháp tốt hơn với ít bước hơn.

- Làm thế nào để AI phân tích nhiều nhất N nước đi tốt nhất?

  Đặt tùy chọn "**Multi PV**" thành N, AI sẽ đưa ra N biến chính tốt nhất sau khi suy nghĩ. Lưu ý: Khi không cần tính năng này, hãy để ở mức 1 để có hiệu suất tốt nhất.

- Làm thế nào để giảm độ khó của AI / tăng sự đa dạng trong nước đi của AI?

  Tùy chọn "**Handicap**" có thể tăng tính ngẫu nhiên của các nước đi của AI và giảm đáng kể sức mạnh của AI. Giá trị càng lớn thì sức mạnh giảm càng nhiều (0 có nghĩa là không giới hạn sức mạnh, 100 có nghĩa là giới hạn sức mạnh tối đa). Ngoài ra, giảm thời gian/tốc độ tính toán cũng sẽ làm giảm sức mạnh của AI, nhưng nó sẽ không tăng tính ngẫu nhiên của nước đi.

- Nước cờ **cân bằng** là gì? Tính toán nước cờ cân bằng có tác dụng gì?

  Nước cờ cân bằng một bước/hai bước có thể làm cho đánh giá của vị trí nghiêng về 0. Sau khi hoàn thành một/hai nước đi, người chơi đen và trắng sẽ có một khai cuộc (gần như) cân bằng. Giá trị ước tính thu được từ việc tìm kiếm thể hiện đánh giá của nước cờ cân bằng, và giá trị càng gần 0 thì vị trí càng cân bằng. Tính toán nước cờ cân bằng rất hữu ích dưới một số luật chơi (chẳng hạn như SWAP2).

- Tôi nên đặt số lượng **luồng** như thế nào? Tùy chọn **Pondering** có tác dụng gì?

  Đa luồng cho phép AI sử dụng nhiều lõi CPU để tính toán, điều này có thể cải thiện đáng kể tốc độ tìm kiếm và kỹ năng suy nghĩ. Nếu bạn muốn sử dụng hết sức mạnh tính toán để đạt được sức mạnh chơi tốt nhất, nên đặt "**Thread Num**" ở mức tối đa. Nếu bạn bật **Pondering**, AI sẽ sử dụng thời gian của đối thủ để suy nghĩ.

  Lưu ý: Nếu bạn không thấy tùy chọn này, trình duyệt của bạn không hỗ trợ tính toán đa luồng. Hiện tại, chỉ có một số trình duyệt hỗ trợ tính toán đa luồng. Bạn có thể kiểm tra trình duyệt hỗ trợ [tại đây](https://caniuse.com/sharedarraybuffer).

- **Mô hình động cơ** là gì? Tôi nên chọn mô hình động cơ nào?

  Mô hình động cơ cung cấp thông tin như đánh giá mà AI sử dụng khi suy nghĩ, và sẽ có ảnh hưởng nhất định đến sức mạnh và phong cách chơi của AI. Nhìn chung, mô hình "mới nhất" có sức mạnh tốt nhất trên mỗi đơn vị thời gian, vì vậy nên chọn mô hình "mới nhất".

- Làm thế nào để đặt **kích thước bảng băm**?

  Nếu bạn cần phân tích trong thời gian dài, hoặc sử dụng nhiều luồng, bạn sẽ cần một bảng băm lớn hơn. Đối với các tính toán nhanh, hãy sử dụng kích thước bảng băm mặc định.

- Màn hình của tôi nhỏ, làm thế nào để tránh nhấp vào vị trí sai?

  Chọn kiểu nhấp là "**Xác nhận lần thứ hai**" hoặc "**Trượt để đi**". "Xác nhận lần thứ hai" yêu cầu bạn nhấp hai lần để xác nhận nước đi, trong khi "Trượt để đi" thực hiện nước đi theo hộp chọn khi nhấn giữ.

- Làm thế nào để lấy/đặt mã vị trí?

  Trường "vị trí hiện tại" trong trang "trò chơi" là mã vị trí hiện tại, bạn có thể sao chép hoặc chỉnh sửa tùy ý.

- Làm thế nào để chia sẻ vị trí cho người khác?

  Bạn có thể nhấp vào nút "Chụp" trong thanh nút để lấy ảnh của vị trí hiện tại, sau đó nhấn giữ để lưu ảnh. Ngoài ra, bạn chỉ cần sao chép liên kết trong trình duyệt và mở nó ở nơi khác để có được vị trí.

- Làm thế nào để lưu một vị trí?

  Hiện tại, bạn cần lưu mã vị trí hoặc liên kết thủ công.

- Làm thế nào để xem trước đường đi tốt nhất do AI tính toán?

  Di chuột qua một nước đi tốt nhất để xem trước các đường đi tốt nhất mà AI hiện đang tính toán. Trên ứng dụng máy tính để bàn, bạn có thể đặt vị trí hiện tại thành đường đi tốt nhất bằng cách nhấp đúp vào nước đi đó.

- Tôi phát hiện ra lỗi? Tôi muốn đóng góp ý kiến?

  Chào mừng bạn gửi lỗi hoặc góp ý kiến [tại đây](https://github.com/gomocalc/gomocalc.github.io/issues) để phản hồi lỗi hoặc đề xuất.

---

### Lịch sử cập nhật

- 0.26
  - sửa vấn đề hiệu suất với đa luồng
  - cập nhật trọng số động cơ
- 0.25
  - thêm tùy chọn để điều chỉnh phạm vi ứng cử viên
  - thêm hiển thị tỷ lệ thắng
- 0.24
  - sửa lỗi sinh nước đi
  - cập nhật trọng số động cơ
- 0.23
  - thêm tùy chọn cho sức mạnh chơi và pondering
- 0.22
  - cập nhật động cơ, hỗ trợ đa luồng
  - hỗ trợ tính toán nước đi cân bằng
- 0.21
  - sửa lỗi phán đoán điểm cấm không đúng
- 0.20
  - cập nhật động cơ lên Rapfi2021, hỗ trợ mới cho luật Gomoku Chuẩn và Renju
- 0.17
  - thêm tùy chọn kích thước bảng chuyển trạng thái
- 0.16
  - tối ưu hóa bố cục ngang
  - xem trước đường đi tốt nhất
- 0.15
  - bảng màu có thể thay đổi
  - hỗ trợ xuất JPEG và GIF độ phân giải cao
  - hiển thị đánh giá theo thời gian thực của phân tích multi-PV
- 0.14
  - thêm hiển thị cho chế độ multi-pv
  - cài đặt có thể tự động lưu
- 0.13
  - sửa lỗi vị trí sau khi quay ngược khi AI đang suy nghĩ
  - sửa lỗi hiển thị trường đường đi

---

### Thông tin về ứng dụng

Website ứng dụng: [Trang chính](https://gomocalc.com)

- [Mirror1](https://www.gomocalc.com)
- [Mirror2](https://gomocalc.github.io)
- [Mirror3](https://gobang.varpop.com)

Trang chủ tác giả Github: [@dhbloo](https://github.com/dhbloo)
