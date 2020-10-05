class Food {
    constructor() {
       this.foodStock=0;
       this.lastfed;
       this.image=loadImage("images/milk.png");
      }
    
    getFoodStock(){
      return this.foodStock;
    }
    
    updateFoodStock(foodStock){
      this.foodStock=foodStock;
    }   
    
    //deductFood(){
    //  if(this.foodStock>0)
    //  {
    //    this.foodStock=this.foodStock-1;
    //  }

    //}
    display(){
       background(46,139,87);

      var x=80,y=100;
     
      imageMode(CENTER);
      image(this.image,150,300,70,70);
   
       if(this.foodStock!=0){
         for(var i=0;i<this.foodStock;i++){
           if(i%10==0){
             x=80;
             y=y+50;
           }
            image (this.image,x,y,50,50);
            x=x+30;
          }
       }

    }
    
    garden(){
      background(gardenImg,200,500);  
  } 
    bedroom(){
      background(bedroomImg,200,500);  
  }
  washroom(){
      background(washroomImg,200,500); 
  }
  };
