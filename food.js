class Food {
    constructor() {
        this.foodStock = 90;
        this.image = loadImage('milk.png');


    }
    updateFoodStock(foodStocke) {
        this.foodStock = foodStocke;
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock() {
        return this.foodStock;
    }

    display() {
        var x = 80, y = 170;

        imageMode(CENTER);
        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }


        }

    }
    bedroom() {
        background(bedroom_img, 1000, 800);
    }
    garden() {
        background(garden_img, 1000, 800);
    }
    washroom() {
        background(washroom_img, 500, 800)
    }

}