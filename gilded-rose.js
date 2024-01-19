export class Item {
    change_in_quality_per_day = -1;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn; //# of days we have to sell item
        this.quality = quality; //item's val
    }

    age() {
        this.sellIn = Math.max(this.sellIn - 1, 0);
        this.quality = Math.min(
            Math.max(
                this.quality + this.change_in_quality_per_day,
                0
            ),
            50
        );
    }
}

export class Conjured extends Item {
    change_in_quality_per_day = -2;
}

export class Cheese extends Item {
    change_in_quality_per_day = 1;
}

export class ConcertTickets extends Item {
    age() {
        if (this.sellIn === 0) {
            this.change_in_quality_per_day = 0;
            this.quality = 0;
        } else if (this.sellIn <= 5) {
            this.change_in_quality_per_day = 3;
        } else if (this.sellIn <= 10) {
            this.change_in_quality_per_day = 2;
        }
        super.age();
    }
}

export class Legendary extends Item {
    change_in_quality_per_day = 0;
    age() {
        super.age();
        this.quality = 80;
    }
}

export let items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new Cheese("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Legendary("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new ConcertTickets("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new Conjured("Conjured Mana Cake", 3, 6));

export const updateQuality = () => {
    for (let item of items) {
        item.age();
    }
};
