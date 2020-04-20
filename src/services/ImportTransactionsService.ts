import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(avatarFilename: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    if (false) throw new AppError('Tipo de arquivo inválido');
  }
}

export default ImportTransactionsService;
