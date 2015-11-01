

(function () {
    
    paper.install(window);
    paper.setup('canvas');
    
    window.onload = function() {
        
        
        var palette = new Palette();
        
        var canvasSize = this.view.size;
        var maxSize = Math.min(canvasSize.width, canvasSize.height);
        var center = this.view.center;
        
        background = new Shape.Rectangle(view.bounds);
        background.fillColor = 'white';
        //        background.strokeColor = palette.gray;
        //        background.strokeWidth = 10;
        
        
        var artLayer = new Layer();
        
        var navbar = new Navbar();
        navbar.prevArrowOnClick = function(event) {
            window.location = "/fiveCircles.html";
        }
        navbar.nextArrowOnClick = function(event) {
            window.location = "/singleSquare.html";
        }
        navbar.draw();
        
        var knobRadius = maxSize * 0.05;
        
        // Ratios are based on knobRadius (i.e. rectangle width = knobRadius * recRatio)
        var recRatio = 10;
        var circleRatio = 8;

        var cornerRatio = 0.5;
        
        var recSize = recRatio * knobRadius;
        var cornerSize = cornerRatio * knobRadius;
        
        var topLeftCorner = center.subtract(recSize * 0.5, recSize * 0.5);
        var rectangle = new Rectangle(topLeftCorner, new Size(recSize,recSize));
        var path = new Path.Rectangle(rectangle, new Size(cornerSize, cornerSize));
        path.strokeColor = palette.medwood;
        path.strokeWidth = 3;
        path.fillColor = palette.wood;
        
        
        var puzzle = new Puzzle();
        
        var circleRadius = circleRatio * knobRadius * 0.5;
        
        var base = new Path.Circle(center, circleRadius);
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
        
        piece = new Group([path, knob]);
        
        puzzle.addPiece(new PuzzlePiece(piece, base));
        
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

