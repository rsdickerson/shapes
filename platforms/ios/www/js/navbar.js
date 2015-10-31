// Navbar class ---------------

Navbar = function() {

    this.color = 'white';
    this.height = view.size.height * 0.1;
    this.width = view.size.width;
    
    this.buttonHeightRatio = 0.9;
    
    this.prevArrowColor = 'blue';
    this.prevArrowOnClick = function(event) {
        window.history.back();
    }

    this.nextArrowColor = 'blue';
    this.nextArrowOnClick = function(event) {
        window.history.back();
    }
    
    this.navbar = null;
    
}

Navbar.prototype.draw = function() {
    
    if (this.navbar) {
        this.navbar.remove();
        this.navbar = null;
    }
    
    var barSize = new Size(this.width, this.height);
    var buttonSize = new Size(barSize.height * this.buttonHeightRatio, barSize.height * this.buttonHeightRatio);
    
    // Previous Button
    var base = new Shape.Rectangle(new Point(0,0),new Size(10,10));
    base.fillColor = this.color;
    
    var path = new Path({
                        segments: [[5, 1], [1, 5], [5, 9]],
                        strokeColor: this.prevArrowColor,
                        strokeWidth: 10,
                        strokeCap: 'round',
                        });
    var path2 = new Path({
                         segments: [[1, 5], [9, 5]],
                         strokeColor: this.prevArrowColor,
                         strokeWidth: 10,
                         strokeCap: 'round',
                         });
    var prevArrow = new Group([base, path, path2]);
    prevArrow.scale(buttonSize.height * 0.1);
    prevArrow.onClick = this.prevArrowOnClick
    var nextArrow = prevArrow.clone();
    nextArrow.rotate(180);
    nextArrow.onClick = this.nextArrowOnClick;
    
    var bar = new Shape.Rectangle(new Point(0,view.size.height - barSize.height), new Size(barSize.width, barSize.height));
    var topLeft = bar.bounds.topLeft;
    var topRight = bar.bounds.topRight;
    prevArrow.position = new Point(topLeft.x + (buttonSize.width/2) + 5, topLeft.y + (buttonSize.height/2));
    nextArrow.position = new Point(topRight.x - (buttonSize.width/2) - 5, topRight.y + (buttonSize.height/2));
    
    this.navbar = new Group(bar, prevArrow, nextArrow);
    
}



