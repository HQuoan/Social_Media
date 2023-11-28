class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // làm sạch stack:  chỉ hiển thị những phần stack mà bạn quan tâm, bỏ qua chi tiết về việc lỗi được tạo ra trong constructor của AppError và các chi tiết thực thi cấp thấp hơn.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
