import { generateHashtags } from "../services/hashtagService.js";
import { AppError } from "../middleware/errorHandler.js";

export async function generateHashtagsController(req, res, next) {
  try {
    const { productName } = req.body;

    if (!productName || !productName.trim()) {
      throw new AppError("Informe o nome do produto.", 400);
    }

    const result = await generateHashtags({ productName });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
