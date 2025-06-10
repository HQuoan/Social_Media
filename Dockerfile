FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Cổng Express chạy ví dụ là 3000 (bạn có thể sửa nếu cần)
EXPOSE 3005

CMD ["npm", "start"]
