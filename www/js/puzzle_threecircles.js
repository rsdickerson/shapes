

(function () {
    
    paper.install(window);
    paper.setup('canvas');
    
    window.onload = function() {
        
        
        var palette = new Palette();
        
        var canvasSize = this.view.size;
        var maxSize = canvasSize.width;
        var center = new Point(this.view.center.x, this.view.center.y * 1.3);
        
        
        background = new Shape.Rectangle(view.bounds);
        background.fillColor = 'white';
        
        
        var artLayer = new Layer();
        
        var navbar = new Navbar();
        navbar.prevArrowOnClick = function(event) {
            window.location = "/singleTriangle.html";
        }
        navbar.nextArrowOnClick = function(event) {
            window.location = "/fiveCircles.html";
        }
        navbar.draw();
        
        var knobRadius = maxSize * 0.023;
        
        // Ratios are based on knobRadius (i.e. rectangle width = knobRadius * recRatio)
        var recRatio = 10;
        var circleRatio = 8;
        
        var cornerRatio = 0.5;
        
        var recSize = recRatio * knobRadius;
        var recWidth = recSize * 3;
        var cornerSize = cornerRatio * knobRadius;
        
        var topLeftCorner = center.subtract(recWidth * 0.5, recSize * 0.5);
        var rectangle = new Rectangle(topLeftCorner, new Size(recWidth,recSize));
        var path = new Path.Rectangle(rectangle, new Size(cornerSize, cornerSize));
        path.strokeColor = palette.medwood;
        path.strokeWidth = 3;
        path.fillColor = palette.wood;
        
        
        var puzzle = new Puzzle();
        
        var circleRadius = circleRatio * knobRadius * 0.5;
        var circel3Center = new Point(center.x + recSize, center.y);
        
        var base = new Path.Circle(circel3Center, circleRadius);
        base.fillColor = palette.litewood;
        base.strokeWidth = 3;
        base.strokeColor = palette.medwood;
        
        var pieceCenter = new Point(circleRadius + 10, circleRadius + 10);
        var path = new Path.Circle(pieceCenter, circleRadius);
        path.fillColor = 'blue';
        path.strokeWidth = 3;
        path.strokeColor = 'blue';
        path.strokeColor.alpha = 0.5;
        
        var knob = new Path.Circle(pieceCenter, knobRadius);
        knob.fillColor = palette.medwood;
        knob.strokeWidth = 5;
        knob.strokeColor = palette.litewood;
        
        piece3 = new Group([path, knob]);
        puzzle.addPiece(new PuzzlePiece(piece3, base));
        
        base2 = base.clone();
        base2.scale(0.85);
        base2.position = center;
        
        path2 = path.clone();
        path2.scale(0.85);
        path2.position = center;
        
        knob2 = knob.clone();
        knob2.position = path2.position;
        
        piece2 = new Group(path2,knob2);
        piece2.position = new Point(center.x * 1.8, piece2.bounds.height * 0.75);
        puzzle.addPiece(new PuzzlePiece(piece2, base2));
        

        // Piece 1
        base1 = base.clone();
        base1.scale(0.70);
        base1.position = new Point(center.x - recSize, center.y);
        
        path1 = path.clone();
        path1.scale(0.70);
        path1.position = base1.position;
        
        knob1 = knob.clone();
        knob1.position = path1.position;
        
        piece1 = new Group(path1,knob1);
        piece1.position = new Point(center.x, piece1.bounds.height * 0.75);
        puzzle.addPiece(new PuzzlePiece(piece1, base1));

        var tool = new Tool();
        tool.onMouseDown = function(event) { puzzle.onMouseDown(event); }
        tool.onMouseUp   = function(event) { puzzle.onMouseUp(event); }
        tool.onMouseMove = function(event) { puzzle.onMouseMove(event); }
        tool.onMouseDrag = function(event) {
            puzzle.onMouseDrag(event);
        }
        
        
        view.update();
    }
})();

