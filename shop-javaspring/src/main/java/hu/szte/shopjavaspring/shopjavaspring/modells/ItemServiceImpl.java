package hu.szte.shopjavaspring.shopjavaspring.modells;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public void addItem(Item item) {
        this.itemRepository.save(item);        
    }

    @Override
    public List<Item> getAllItems() {
        List<Item> list = this.itemRepository.findAll();
       return list;
    }

    @Override
    public Item getItemById(int id) {
        Item item = this.itemRepository.findById(id).get();
        return item;
    }

    @Override
    public void deleteItemById(int id) {
        this.itemRepository.deleteById(id);
    }
    
}
