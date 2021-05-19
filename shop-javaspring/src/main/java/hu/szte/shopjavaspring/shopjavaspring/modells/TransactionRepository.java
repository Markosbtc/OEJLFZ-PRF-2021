package hu.szte.shopjavaspring.shopjavaspring.modells;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
    
}
