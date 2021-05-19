package hu.szte.shopjavaspring.shopjavaspring.modells;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer>{
    
}
