export function errorHandler(err, req, res, next) {
  console.error(`[erro] ${req.method} ${req.originalUrl} ->`, err.message);

  const status = err.status || 500;
  res.status(status).json({
    error: err.publicMessage || "Não foi possível concluir a operação. Tente novamente.",
  });
}

export class AppError extends Error {
  constructor(publicMessage, status = 400) {
    super(publicMessage);
    this.publicMessage = publicMessage;
    this.status = status;
  }
}
