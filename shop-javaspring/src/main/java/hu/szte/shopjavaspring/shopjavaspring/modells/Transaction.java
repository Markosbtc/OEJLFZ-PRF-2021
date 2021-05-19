package hu.szte.shopjavaspring.shopjavaspring.modells;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String item_id;
    private int sum;

    
    private LocalDateTime date;
    
    public Transaction() {
    }

    public Transaction(int id, String item_id, int sum, LocalDateTime date) {
        this.id = id;
        this.item_id = item_id;
        this.sum = sum;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItem_id() {
        return item_id;
    }

    public void setItem_id(String item_id) {
        this.item_id = item_id;
    }

    public int getSum() {
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Transaction [date=" + date + ", id=" + id + ", item_id=" + item_id + ", sum=" + sum + "]";
    }

}
