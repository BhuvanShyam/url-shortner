import Url, { IUrl } from "@/models/Url";
import connectDB from "@/config/db";

export default class UrlRepository {
  private urlModel;
  constructor() {
    connectDB();
    this.urlModel = Url;
  }

  async getUrlById(id: string): Promise<IUrl | null> {
    return await this.urlModel.findById(id).lean();
  }

  async getUrlByShortUrl(shortUrl: string): Promise<IUrl | null> {
    return await this.urlModel.findOne({ shortUrl }).lean();
  }
  async getUrlByOriginalUrl(originalUrl: string): Promise<IUrl | null> {
    return await this.urlModel.findOne({ originalUrl }).lean();
  }
  async getAllUrls(): Promise<IUrl | null> {
    return await this.urlModel.find().lean();
  }
  async deleteUrlById(id: string): Promise<IUrl | null> {
    return await this.urlModel.findByIdAndDelete(id).lean();
  }
  async createUrl(originalUrl: string, shortUrl: string): Promise<IUrl> {
    return await this.urlModel.create({ originalUrl, shortUrl });
  }
  async updateUrl(originalUrl: string, shortUrl: string): Promise<IUrl | null> {
    return await this.urlModel
      .findOneAndUpdate({ originalUrl }, { $set: { shortUrl } }, { new: true })
      .lean();
  }
}

// UrlRepository methods:
// getUrlById: Retrieves a URL document by its ID.
// getUrlByShortUrl: Retrieves a URL document by its short URL.
// getUrlByOriginalUrl: Retrieves a URL document by its original URL.
// getAllUrls: Retrieves all URL documents.
// deleteUrlById: Deletes a URL document by its ID.
// createUrl: Creates a new URL document with the original and short URLs.
// updateUrl: Updates the short URL for a given original URL