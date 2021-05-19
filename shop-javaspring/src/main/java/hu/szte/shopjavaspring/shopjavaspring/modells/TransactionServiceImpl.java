package hu.szte.shopjavaspring.shopjavaspring.modells;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void addTransaction(Transaction transaction) {
        this.transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        List<Transaction> list = this.transactionRepository.findAll();
        return list;
    }

    @Override
    public Transaction getTransactionById(int id) {
        Transaction transaction = this.transactionRepository.findById(id).get();
        return transaction;
    }

    @Override
    public void deleteTransactionById(int id) {
        this.transactionRepository.deleteById(id);
    }

}
