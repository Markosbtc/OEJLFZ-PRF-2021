package hu.szte.shopjavaspring.shopjavaspring.modells;

import java.util.List;

public interface ItemService {
    void addItem(Item item);
    List<Item> getAllItems();
    Item getItemById(int id);
    void deleteItemById(int id);
}
