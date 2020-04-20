import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionType from '../enums/TransactionType';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    let balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    if (transactions.length === 0) return balance;

    const sumValues = (accum: number, curr: number): number => accum + curr;

    const income = transactions
      .map(x => {
        return Number(x.type === TransactionType.INCOME ? x.value : 0);
      })
      .reduce(sumValues);

    const outcome = transactions
      .map(x => {
        return Number(x.type === TransactionType.OUTCOME ? x.value : 0);
      })
      .reduce(sumValues);

    const total = income - outcome;

    balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
