import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionType from '../enums/TransactionType';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: TransactionType;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    if (!Object.values(TransactionType).includes(type))
      throw new AppError('Tipo de operação inválido!');

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > total)
      throw new AppError('Saldo insuficiente!');

    let categoryDB = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!categoryDB) {
      categoryDB = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryDB);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryDB,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
