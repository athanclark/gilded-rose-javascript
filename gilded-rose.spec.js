import { expect, describe, it } from "vitest";
import { Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
    it("never has a quality less than 0", () => {
        for (let i = 0; i < 50; i++) {
            items.push(new Item(`basic${i}`, 30, 30));
        }
        for (let i = 0; i < 100; i++) {
            updateQuality();
            quality_never_negative();
        }
    });

    it("never has a quality over 50", () => {
        for (let i = 0; i < 50; i++) {
            items.push(new Item(`basic${i}`, 30, 30));
        }
        for (let i = 0; i < 100; i++) {
            updateQuality();
            quality_never_over_50();
        }
    });

    it("reduces quality and sellIn of basic items by 1", () => {
        const testItem = new Item("basic", 5, 3);
        items.push(testItem);

        updateQuality();

        expect(testItem.quality).toBe(2);
        expect(testItem.sellIn).toBe(4);
    });

    it("increases quality of aged brie over time", () => {
        const aged_brie = items.filter(i => i.name == "Aged Brie")[0];
        const old_value = aged_brie.quality;
        updateQuality();
        const new_value = aged_brie.quality;

        expect(old_value).toBeLessThanOrEqual(new_value);
    });
});

function quality_never_negative() {
    for (const item of items) {
        expect(item.quality).toBeGreaterThanOrEqual(0);
    }
}

function quality_never_over_50() {
    for (const item of items) {
        if (item.name === "Sulfuras, Hand of Ragnaros") {
            expect(item.quality).toBe(80);
        } else {
            expect(item.quality).toBeLessThanOrEqual(50);
        }
    }
}
